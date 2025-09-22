from datetime import datetime


def getyear(request):
    return {"year": datetime.now().year}
