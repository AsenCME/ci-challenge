from django.db import models
from api.director.model import Director


class Movie(models.Model):
    name = models.TextField()
    release_year = models.IntegerField()
    director = models.ForeignKey(
        Director, on_delete=models.SET_NULL, null=True, related_name='movies')
