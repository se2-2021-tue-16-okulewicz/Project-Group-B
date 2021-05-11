package se.backend.controller.internal;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import se.backend.service.admin.AdminService;
import se.backend.service.lostdogs.LostDogService;

import static java.util.stream.Collectors.joining;

@RestController
@RequestMapping(path = "/admin")
public class AdministratorController {
    private final Logger logger = LoggerFactory.getLogger(AdministratorController.class);
    private void logHeaders(@RequestHeader HttpHeaders headers) {
        logger.info("Controller request headers {}",
                headers.entrySet()
                        .stream()
                        .map(entry -> String.format("%s->[%s]", entry.getKey(), String.join(",", entry.getValue())))
                        .collect(joining(","))
        );
    }

    private final AdminService adminService;

}
