from django.db import models
# from django.contrib.auth.models import User
from django.db import models
import random
from datetime import timedelta
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils.translation import gettext_lazy as _

class CustomUserManager(BaseUserManager):
    def create_user(self, email, name, password=None, **extra_fields):
        """
        Create and return a regular user with an email and password.
        """
        if not email:
            raise ValueError(_('The Email field must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, name=name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, password=None, **extra_fields):
        """
        Create and return a superuser with an email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))

        return self.create_user(email, name, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    """
    Custom user model where the email is the unique identifier instead of usernames,
    and multiple users can share the same name.
    """
    email = models.EmailField(_('email address'), unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def __str__(self):
        return self.email

class Department(models.Model):
    dept_id = models.CharField(max_length=100, unique=True)
    dept_name = models.CharField(max_length=100)

    def __str__(self):
        return self.dept_name

class Student_user(models.Model):
    
    YEAR_CHOICES = [
        ('1st', '1st year'),
        ('2nd', '2nd year'),
        ('3rd', '3rd year'),
        ('4th', 'Final year'),
    ]

    SECTION_CHOICES = [
        ('A', 'A'),
        ('B', 'B'),
        ('C', 'C'),
        ('D', 'D'),
    ]
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=50)
    dept = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True)
    year = models.CharField(max_length=10, choices=YEAR_CHOICES , default='1st')
    section = models.CharField(max_length=5, choices=SECTION_CHOICES , default='A')
    email = models.EmailField(unique=True)
    parent_email = models.EmailField(null=True, blank=True)
    password = models.CharField(max_length=16) 

    def delete(self, *args, **kwargs):
        print(f"Deleting Student_user {self.name} and associated CustomUser {self.user}")
        
        if self.user:
            self.user.delete()  # This will delete the associated CustomUser
            super().delete(*args, **kwargs)  # This deletes the Student_user instance


    def __str__(self):
        return f"{self.name} (Department:{self.dept},{self.year} Year,{self.section} Section)"

class StudentAttendance(models.Model):
    student = models.ForeignKey(Student_user, on_delete=models.CASCADE)
    working_days = models.IntegerField()
    present_days = models.IntegerField()
    absent_days = models.IntegerField()
    month = models.CharField(max_length=20)
    year = models.IntegerField()

    class Meta:
        unique_together = ('student', 'month', 'year')  # Ensure unique attendance records per student per month/year

    def __str__(self):
        return f"{self.student.name} -Month {self.month} {self.year}"

class OTP(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    otp = models.CharField(max_length=26, blank=True) 
    created_at = models.DateTimeField(auto_now_add=True)

    def generate_otp(self):
        return str(random.randint(100000, 999999))

    def save(self, *args, **kwargs):
        if not self.otp:
            self.otp = self.generate_otp()
        super().save(*args, **kwargs)

    def is_expired(self):
        expiration_time = self.created_at + timezone.timedelta(seconds=70)
        return timezone.now() > expiration_time

