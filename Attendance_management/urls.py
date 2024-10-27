from django.urls import path
from .views import *
urlpatterns = [
      path('Register_user/',RegistrationUsersView.as_view(), name='Register-user'),

      path('user_login/', user_Login_view.as_view(), name='login'),
      path('admin_login/', Admin_Login_view.as_view(), name='login'),

      path('verify_otp/', VerifyOTPView.as_view(), name='verify-otp'),
      path('resend_otp/', resend_otp, name='resend_otp'),

      path('admin_profile/',Admin_profile_view.as_view(),name='profile'),
      path('user_profile/',Users_profile_view.as_view(),name='profile'),
      path('single_user_profile/',User_profile_view.as_view(),name='profile'),
      path('user_profile/<int:pk>/', studentRetrieveUpdateDestroyView.as_view(), name='student-detail'),

      path('request-password-reset/', PasswordResetRequestView.as_view(), name='request-password-reset'),
      path('reset-password/', PasswordResetView.as_view(), name='reset-password'),

      path('departments/', DepartmentListView.as_view(), name='department-list'),
      path('departments/add/', DepartmentCreateView.as_view(), name='add-department'),
      path('departments/<int:id>/', DepartmentDetailView.as_view(), name='department-detail'),

      path('departments/update/<int:pk>/', DepartmentDetailView.as_view(), name='update_department'),
      path('departments/delete/<int:pk>/', DepartmentDetailView.as_view(), name='delete_department'),

      path('attendance/', StudentAttendanceView.as_view(), name='student-attendance'),
      path('update-attendance/', UpdateAttendance.as_view(), name='update-attendance'),

      path('students/', StudentListView.as_view(), name='student-list'),
      
      path('updateAttendance/', AttendanceCreateUpdateView.as_view(), name='update-attendance'),
      path('student/<int:student_id>/attendance/', StudentAttendanceListView.as_view(), name='student-attendance'),
      path('send_email/', send_email, name='send_email'),
 ]