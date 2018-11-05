package com.rsi.memegenerator.security;

import com.rsi.memegenerator.model.UserDetailsServiceImpl;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.context.annotation.Bean;

import static com.rsi.memegenerator.constant.URLConstants.API;
import static com.rsi.memegenerator.constant.URLConstants.STORAGE;
import static com.rsi.memegenerator.constant.URLConstants.UPLOAD_BLANK_MEME;
import static com.rsi.memegenerator.constant.URLConstants.USER;


/**
 * This class overrides Spring Security's default username/password
 */
@EnableWebSecurity
public class WebSecurity extends WebSecurityConfigurerAdapter {
    private UserDetailsServiceImpl userDetailsService;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public WebSecurity(UserDetailsServiceImpl userDetailsService, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userDetailsService = userDetailsService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    /**
     * Configuration for skipped by Spring Security, such as a POST from "/sign-up".
     *
     * @param http not too sure
     * @throws Exception also not too sure
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .cors()
        .and()
            .authorizeRequests()
            .antMatchers(HttpMethod.POST, STORAGE + UPLOAD_BLANK_MEME)
            .permitAll()
        .and()
            .csrf()
            .disable()
            .authorizeRequests()
            .antMatchers(HttpMethod.POST, API + USER + "/*")
            .permitAll()
            .anyRequest()
            .authenticated()
        .and()
            .addFilter(new JWTAuthenticationFilter(authenticationManager()))
            .addFilter(new JWTAuthorizationFilter(authenticationManager()))
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        ;
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", new CorsConfiguration().applyPermitDefaultValues());
        return source;
    }
}