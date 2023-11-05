package reading.project.domain.auth.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import reading.project.domain.auth.utils.ErrorResponder;
import reading.project.domain.auth.utils.JwtUtils;


import java.util.Map;

@Component
@RequiredArgsConstructor
public class JwtParseInterceptor implements HandlerInterceptor {
    private final JwtUtils jwtUtils;
    private static final ThreadLocal<Long> authenticatedUserId = new ThreadLocal<>();

    public static long getAuthenticatedUserId() {
        return authenticatedUserId.get();
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        try {
            Map<String, Object> claims = jwtUtils.getJwsClaims(request);
            Object userId = claims.get("Id");
            if (userId != null) {
                authenticatedUserId.set(Long.valueOf(userId.toString()));
                return true;
            } else {
                ErrorResponder.sendAuthorizedErrorResponse(response, HttpStatus.UNAUTHORIZED);

                return false;
            }
        } catch (Exception e) {
            authenticatedUserId.set(-1L);
            return true;
        }
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        authenticatedUserId.remove();
    }
}