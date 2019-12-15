import smtplib
import os
import sys
from email.mime.text import MIMEText
from email.header import Header


envs = os.environ
smtpuser = envs.get('USER') or print("env: USER") and sys.exit(1)
smtppassword = envs.get('PASSWORD') or sys.exit(1)
smtpurl = envs.get('SMTPURL') or print("env: SMTPURL") and sys.exit(1)
smtpport = envs.get('SMTPPORT') or sys.exit(1)


def mailMessage(subject, _from, mailBody):
    message = MIMEText(mailBody, 'html', 'utf-8')
    message['Subject'] = Header(subject, 'utf-8')  # email外部标题显示
    message['From'] = Header(_from, 'utf-8')  # 替换发现人邮箱，在email的显示
    return message


def sendMail(receivers, mailBody):
    smtpserver = smtplib.SMTP_SSL(smtpurl, smtpport)
    smtpserver.login(smtpuser, smtppassword)
    smtpserver.sendmail(smtpuser, receivers, mailMessage(
        'subject', 'from', mailBody).as_string())


if __name__ == "__main__":
    sendMail("326314646@qq.com", "<h1>abc</h1>")
