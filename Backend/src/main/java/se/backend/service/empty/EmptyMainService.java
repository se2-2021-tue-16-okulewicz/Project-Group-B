package se.backend.service.empty;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.backend.dao.EmptyRepository;
import se.backend.model.EmptyModel;

import java.util.List;

@Service
public class EmptyMainService implements EmptyService {
    private final Logger logger = LoggerFactory.getLogger(EmptyMainService.class);

    @Autowired
    private final EmptyRepository repository;


    public EmptyMainService(EmptyRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<EmptyModel> getAllItems() {
        return repository.findAll();
    }

}
