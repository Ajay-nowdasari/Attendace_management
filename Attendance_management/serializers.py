from rest_framework import serializers
from .models import *
from django.contrib.auth.hashers import make_password ,check_password 
from .models import Student_user, Department
from django.core.exceptions import ObjectDoesNotExist

class user_registration_Serializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)  # Define confirm_password as a write-only field

    class Meta:
        model = Student_user
        fields = ['user', 'name', 'email','parent_email', 'password', 'confirm_password', 'dept', 'year', 'section']

    def validate_email(self, value):
        # Check if the email already exists in the Student_user model
        if Student_user.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already in use.")
        return value

    def validate(self, attrs):
        # Ensure the passwords match
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError({"confirm_password": "Passwords do not match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        hashed_password = self.hash_password(validated_data['password'])

        user = CustomUser.objects.create_user(
            name=validated_data['name'],
            email=validated_data['email'],
            password=validated_data['password']  # `create_user` handles password hashing
        )

     # Correctly get the department ID
        dept_name = validated_data.get('dept')  # This should contain the dept_id being sent
        print(f"Department ID being used: {dept_name}")

        try:
            department = Department.objects.get(dept_name=dept_name)
            print(f"Department Name: {department.dept_name}")  # Log the name for verification

        except ObjectDoesNotExist:
            raise serializers.ValidationError({"dept": "The specified department does not exist."})
        print("Available Departments:", Department.objects.all())
        student_user = Student_user.objects.create(
            user=user,
            name=validated_data['name'],
            email=validated_data['email'],
            parent_email=validated_data['parent_email'],
            password=hashed_password,
            dept=department,  # Use the Department object
            year=validated_data.get('year', '1st'), 
            section=validated_data.get('section', 'A'),
        )
        return student_user

    def hash_password(self, password):
        return make_password(password)

class user_LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        email = data.get('email').lower().strip()
        password = data.get('password')
        print(email,"email",password,"password")
        if email and password:
            try:
                user = CustomUser.objects.get(email=email)
                print(f"User found: {user}")
                if user.is_superuser:
                     raise serializers.ValidationError("This account is restricted from logging in due to elevated superuser privileges.")

                if user.is_staff:
                    raise serializers.ValidationError("This account is restricted from logging in due to elevated isStaff privileges.")

                if check_password(password, user.password):
                    data["user"] = user
                else:
                    raise serializers.ValidationError("Incorrect password.")
            
            except CustomUser.DoesNotExist:
                raise serializers.ValidationError("No user found with this email.")

        else:
            raise serializers.ValidationError("Must include 'email' and 'password'.")

        return data

class Admin_Login_Serializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        email = data.get('email').lower().strip()
        password = data.get('password')

        if email and password:
            try:
                user = CustomUser.objects.get(email=email)
                print(f"Admin found: {user}")
                
                if not user.is_superuser:
                     raise serializers.ValidationError("This account does not have superuser privileges.")

                if not user.is_staff:
                    raise serializers.ValidationError("This account does not have staff privileges.")

                # Using check_password to verify the hashed password
                if user.check_password(password):
                    data['user'] = user
                else:
                    raise serializers.ValidationError("Incorrect password.")
            except CustomUser.DoesNotExist:
                raise serializers.ValidationError("No Admin found with this email.")
        else:
            raise serializers.ValidationError("Must include 'email' and 'password'.")

        return data

class adminSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser 
        fields = ["id", "name", "email",]

class user_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Student_user
        fields = ["id", "user", "name", "email", "dept", "year", "section"]


class userSerializer(serializers.ModelSerializer):
    dept = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all())
    dept_name = serializers.CharField(source='dept.dept_name', read_only=True)

    class Meta:
        model = Student_user
        fields = ["id", "user", "name", "email","parent_email", "dept", "dept_name", "year", "section"]

    def update(self, instance, validated_data):
        # Update the related CustomUser fields first
        user = instance.user
        
        if user:
            user.name = validated_data.get('name', user.name)
            user.email = validated_data.get('email', user.email)
            user.save()  # Save the CustomUser instance

        # Now update the Student_user fields
        instance.name = validated_data.get('name', instance.name)
        instance.email = validated_data.get('email', instance.email)
        instance.dept = validated_data.get('dept', instance.dept)
        instance.year = validated_data.get('year', instance.year)
        instance.section = validated_data.get('section', instance.section)

        instance.save()  # Save the Student_user instance
        return instance

from rest_framework import serializers

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id','dept_id', 'dept_name']
    


class StudentAttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentAttendance
        fields = '__all__'


class StudentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student_user
        fields = '__all__'


class StudentAttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentAttendance
        fields = ['student', 'working_days', 'present_days', 'absent_days', 'month', 'year']
        
    def validate(self, attrs):
        # Additional validation can go here if necessary
        return attrs