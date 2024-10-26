# utils.py
from django.core.mail import send_mail
from django.conf import settings

def send_otp_email(email, otp):
    subject = 'Password Reset OTP'  # Define the subject
    message = f'Your OTP code is {otp}'  # Define the message

    try:
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,  # Sender email from settings
            [email],  # Recipient list
            fail_silently=False,
        )
    except Exception as e:
        # Log the error if needed
        print(f"Failed to send email: {str(e)}")
        return False  # Return False to indicate failure

    return True  # Return True to indicate success
