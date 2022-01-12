from django.db import models


class Director(models.Model):
    first_name = models.TextField()
    last_name = models.TextField()

    def __str__(self):
        return str(self.id) + '|' + self.first_name + ' ' + self.last_name
