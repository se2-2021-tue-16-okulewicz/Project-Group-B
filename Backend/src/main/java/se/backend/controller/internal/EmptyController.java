package se.backend.controller.internal;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import static java.util.stream.Collectors.joining;

@RestController
@RequestMapping(path = "/")
public class EmptyController {

    private final Logger logger = LoggerFactory.getLogger(EmptyController.class);

    private void logHeaders(@RequestHeader HttpHeaders headers) {
        logger.info("Controller request headers {}",
                headers.entrySet()
                        .stream()
                        .map(entry -> String.format("%s->[%s]", entry.getKey(), String.join(",", entry.getValue())))
                        .collect(joining(","))
        );
    }

}
