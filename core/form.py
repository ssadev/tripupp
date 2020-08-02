from django import forms


class MatchImageSearchForm(forms.Form):
    img = forms.FileField()
