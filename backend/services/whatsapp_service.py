import os
from twilio.rest import Client

def send_whatsapp_reminder(phone, task_title):
    # .env ya Render dashboard se values uthayega
    account_sid = os.environ.get('TWILIO_ACCOUNT_SID')
    auth_token = os.environ.get('TWILIO_AUTH_TOKEN')
    from_number = os.environ.get('TWILIO_FROM_NUMBER')
    
    client = Client(account_sid, auth_token)

    try:
        message = client.messages.create(
            from_=from_number,
            body=f"🚀 *TASK REMINDER* 🚀\n\nBhai, aapka task *'{task_title}'* ka time ho gaya hai. Chalo shuru ho jao!",
            to=f"whatsapp:{phone}"
        )
        print(f"✅ Message Sent! SID: {message.sid}")
        return True
    except Exception as e:
        print(f"❌ Twilio Error: {e}")
        return False