package se.backend.service.http;

import se.backend.web.Quote;

public interface HttpClient {
    Quote consume(String url);
}
