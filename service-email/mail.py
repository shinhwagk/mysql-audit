import smtplib
from email.mime.text import MIMEText
from email.header import Header


sender = 'from@runoob.com'
receivers = ['429240967@qq.com']

message = MIMEText(mail_msg, 'html', 'utf-8')
message['From'] = Header("菜鸟教程", 'utf-8')
message['To'] = Header("测试", 'utf-8')

subject = 'Python SMTP 邮件测试'
message['Subject'] = Header(subject, 'utf-8')

sender = 'thesender@gmail.com'
receiver = 'whicheverreceiver@gmail.com'
password = '’<put your password here>''
smtpserver = smtplib.SMTP("smtp.gmail.com", 587)
smtpserver.ehlo()
smtpserver.starttls()
smtpserver.ehlo
smtpserver.login(sender, password)
msg ='Subject: Demo\nThis is a demo
smtpserver.sendmail(sender, receiver, msg)
print('Sent')
