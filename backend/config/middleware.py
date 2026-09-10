import logging

activity_logger = logging.getLogger('activity')


class RequestLoggingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        user = request.user.email if request.user.is_authenticated else 'anonymous'
        activity_logger.info(
            'user=%s method=%s path=%s status=%s',
            user, request.method, request.path, response.status_code,
        )

        return response
