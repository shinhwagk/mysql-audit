import os
import json

import falcon
from jinja2 import Template
from wsgiref import simple_server

from mail import sendMail, broadcastMails


def load_template(name):
    path = os.path.join('templates', name)
    with open(os.path.abspath(path), 'r') as fp:
        return Template(fp.read())


class GitlabTemplateResource(object):
    def on_post(self, req, resp):
        body = req.bounded_stream.read()
        template = load_template('gitlab.template.html.j2')
        resp.status = falcon.HTTP_200
        resp.content_type = 'text/html'
        mailData = json.loads(body)
        mailBody = template.render(data=mailData["template"])
        sendMail(mailData["receivers"] +
                 broadcastMails, "aaa", "bbb", mailBody)


app = falcon.API()
app.add_route('/gitlab', GitlabTemplateResource())

if __name__ == '__main__':
    httpd = simple_server.make_server('0.0.0.0', 7000, app)
    httpd.serve_forever()
