from django.shortcuts import render,get_object_or_404
from .serializers import *
from .models import *
from django.http import JsonResponse
from rest_framework import generics,status
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes,force_str
from django.contrib.auth.tokens import default_token_generator, PasswordResetTokenGenerator
from django.conf import settings
from .utils import send_otp_email  # Assuming this utility function sends the OTP email


class RegistrationUsersView(APIView):
    def post(self, request):  
        serializer = user_registration_Serializer(data=request.data)
        if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class user_Login_view(APIView):
    def post(self, request):
        serializer=user_LoginSerializer(data=request.data)
        if serializer.is_valid():
            user=serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)
            refresh['name'] = user.name 
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)
            name = user.name
            usertype = "user"
            otp_instance = OTP(user=user)
            otp_instance.save()
            try:
                send_mail(
                    'Your OTP Code',
                    f'Your OTP code is {otp_instance.otp}',
                    settings.DEFAULT_FROM_EMAIL,
                    [user.email],
                    fail_silently=False,
                )
            except Exception as e:
                return Response(f'An error occurred: {str(e)}', status=500)


            return Response({
                "id":user.id,
                "useremail":user.email,
                "username": name,
                "usertype": usertype,
                "access_token": access_token,
                "refresh_token": refresh_token,
                },status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class Admin_Login_view(APIView):
    def post(self, request):
        serializer=Admin_Login_Serializer(data=request.data)
        if serializer.is_valid():
            admin=serializer.validated_data['user']
            refresh = RefreshToken.for_user(admin)
            refresh['name'] = admin.name 
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)
            name = admin.name
            usertype = "admin"

            otp_instance = OTP(user=admin)
            otp_instance.save()

            try:
                send_mail(
                    'Your OTP Code',
                    f'Your OTP code is {otp_instance.otp}',
                    settings.DEFAULT_FROM_EMAIL,
                    [admin.email],
                    fail_silently=False,
                )
            except Exception as e:
                return Response(f'An error occurred: {str(e)}', status=500)


            return Response({
                "username": name,
                "useremail":admin.email,
                "usertype": usertype,
                "access_token": access_token,
                "refresh_token": refresh_token,
                },status=status.HTTP_200_OK)

        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)



class VerifyOTPView(APIView):
    def post(self, request):
        email = request.data.get('useremail')
        otp = request.data.get('otp')

        try:
            # Fetch the user with the provided name
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        try:
            # Get the latest OTP for the user and the provided OTP code
            otp_instance = OTP.objects.get(user=user, otp=otp)

            # Check if the OTP has expired
            if otp_instance.is_expired():
                return Response({'error': 'OTP has expired'}, status=status.HTTP_400_BAD_REQUEST)

            # If OTP is valid and not expired, delete it and return success
            otp_instance.delete()
            return Response({'success': 'OTP verified successfully'}, status=status.HTTP_200_OK)

        except OTP.DoesNotExist:
            return Response({'error': 'Invalid OTP'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def resend_otp(request):
    email = request.data.get('useremail')
    if not email:
        return Response({"success": False, "message": "Username is required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = CustomUser.objects.get(email=email)
    except CustomUser.DoesNotExist:
        return Response({"success": False, "message": "User not found."}, status=status.HTTP_404_NOT_FOUND)

    # Create a new OTP instance
    otp_instance = OTP(user=user)
    otp_instance.save()  # This will automatically generate and save the OTP

    # Send the newly generated OTP to the user's email
    if send_otp_email(user.email, otp_instance.otp):
        return Response({"success": True, "message": "OTP has been resent."}, status=status.HTTP_200_OK)
    else:
        return Response({"success": False, "message": "Failed to send OTP email."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class Admin_profile_view(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user 
        serializer = adminSerializer(user)
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class Users_profile_view(generics.ListCreateAPIView):
    queryset = Student_user.objects.all()
    serializer_class = userSerializer

class User_profile_view(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = user_Serializer
    def get_object(self):
        return Student_user.objects.get(user=self.request.user)

class studentRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated] 
    queryset = Student_user.objects.all()
    serializer_class = userSerializer



class PasswordResetRequestView(APIView):
    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({"message": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return Response({"message": "No user found with this email"}, status=status.HTTP_404_NOT_FOUND)

        # Generate and save OTP
        otp_instance = OTP(user=user)
        otp_instance.save()

        # Send OTP to user's email
        try:
            send_mail(
                'Password Reset OTP',
                f'Your OTP code is {otp_instance.otp}',
                settings.DEFAULT_FROM_EMAIL,
                [email],
                fail_silently=False,
            )
        except Exception as e:
            return Response({"message": f"Failed to send email: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({"message": "Password reset OTP sent to your email."}, status=status.HTTP_200_OK)

class PasswordResetView(APIView):
    def post(self, request):
        email = request.data.get('email')
        otp = request.data.get('otp')
        password = request.data.get('password')

        print("email",email);
        print("password",password)
        print("otp",otp)
        if not (email and otp and password):
            return Response({"message": "Email, OTP, and password are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return Response({"message": "Invalid email."}, status=status.HTTP_404_NOT_FOUND)

        # Validate OTP
        otp_instance = OTP.objects.filter(user=user, otp=otp).first()
        if not otp_instance or otp_instance.is_expired():
            return Response({"message": "Invalid or expired OTP."}, status=status.HTTP_400_BAD_REQUEST)

        # Set new password
        user.set_password(password)
        user.save()

        # Optionally, delete the used OTP
        otp_instance.delete()

        return Response({"message": "Password has been reset successfully."}, status=status.HTTP_200_OK)


class DepartmentCreateView(generics.CreateAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

# List all departments
class DepartmentListView(generics.ListAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

# Retrieve, update, or delete a department
class DepartmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated] 
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer


class StudentAttendanceView(APIView):
    def post(self, request):
        serializer = StudentAttendanceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class UpdateAttendance(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        try:
            student = Student_user.objects.get(id=data.get('student_id'))
            attendance_record, created = StudentAttendance.objects.get_or_create(
                student=student, month=data.get('month'), defaults={'working_days': data.get('working_days')}
            )
            attendance_record.attendance = data.get('attendance')
            attendance_record.present_days = data.get('present_days')
            attendance_record.absent_days = data.get('absent_days')
            attendance_record.save()
            return Response({"message": "Attendance updated successfully!"}, status=status.HTTP_200_OK)
        except Student_user.DoesNotExist:
            return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class StudentListView(APIView):
    def get(self, request):
        # Get filter parameters
        year = request.query_params.get('year')
        dept = request.query_params.get('dept')
        section = request.query_params.get('section')
        
        # Apply filters if they are provided
        students = Student_user.objects.all()
        if year:
            students = students.filter(year=year)
        if dept:
            students = students.filter(dept__dept_name=dept)
        if section:
            students = students.filter(section=section)

        # Serialize and return data
        serializer = StudentUserSerializer(students, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AttendanceCreateUpdateView(generics.CreateAPIView):
    """
    View for creating/updating attendance records.
    """
    serializer_class = StudentAttendanceSerializer

    def create(self, request, *args, **kwargs):
        data = request.data
        student_id = data.get('student')
        month = data.get('month')
        year = data.get('year')

        # Check if the attendance record already exists
        existing_record = StudentAttendance.objects.filter(student_id=student_id, month=month, year=year).first()

        if existing_record:
            # Update existing attendance record
            serializer = self.get_serializer(existing_record, data=data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Create a new attendance record
        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StudentAttendanceListView(generics.ListAPIView):
    serializer_class = StudentAttendanceSerializer

    def get_queryset(self):
        student_id = self.kwargs.get('student_id')
        return StudentAttendance.objects.filter(student_id=student_id)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        if not queryset.exists():
            return Response({'detail': 'No attendance records found for this student.'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

@api_view(['POST'])
def send_email(request):
    try:
        email = request.data.get('email')
        subject = request.data.get('subject')
        message = request.data.get('message')
        
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,  # Replace with your "from" email address
            [email],
            fail_silently=False,
        )
        
        return Response({"success": "Email sent successfully"}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)