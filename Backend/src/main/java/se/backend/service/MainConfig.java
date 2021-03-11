package se.backend.service;

import net.kaczmarzyk.spring.data.jpa.web.SpecificationArgumentResolver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import se.backend.service.http.HttpClient;
import se.backend.service.http.HttpService;

import javax.annotation.PostConstruct;
import java.util.*;

import static java.util.stream.Collectors.toSet;

@Configuration
@EnableScheduling
public class MainConfig implements WebMvcConfigurer {

    @Value(value = "${cors.urls}")
    private String corsUrls;
    @Value(value = "${cors.mappings}")
    private String corsMappings;

    @PostConstruct
    private void init() {
        Logger logger = LoggerFactory.getLogger(MainConfig.class);
        logger.info("************** Environment variables **************");
        for (Map.Entry<String, String> entry : System.getenv().entrySet()) {
            logger.info("[{}] : [{}]", entry.getKey(), entry.getValue());
        }
    }

    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        return builder.build();
    }

    @Bean
    public HttpClient httpClient(RestTemplate restTemplate) {
        return new HttpService(restTemplate);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        getCorsUrls();
        return new WebMvcConfigurer() {
            @SuppressWarnings("NullableProblems")
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                final Set<String> mappings = getCorsMapings();
                if (mappings.isEmpty()) {
                    registry.addMapping("/**");
                } else {
                    for (String mapping : mappings) {
                        registry.addMapping(mapping).allowedOrigins(getCorsUrls()).allowedMethods("GET", "POST", "PUT", "DELETE");
                    }
                }
            }
        };
    }

    private String[] getCorsUrls() {
        return Optional.ofNullable(corsUrls)
                .map(value -> value.split(","))
                .orElseGet(() -> new String[0]);
    }

    private Set<String> getCorsMapings() {
        return Optional.ofNullable(corsMappings)
                .map(value -> Arrays.stream(value.split(",")))
                .map(stream -> stream.collect(toSet()))
                .orElseGet(HashSet::new);
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
        argumentResolvers.add(new SpecificationArgumentResolver());
    }
}
