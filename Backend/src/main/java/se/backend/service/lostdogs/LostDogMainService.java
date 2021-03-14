package se.backend.service.lostdogs;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import se.backend.dao.LostDogRepository;
import se.backend.model.LostDog;

import java.util.List;


@Service
public class LostDogMainService implements LostDogService{
    private final Logger logger = LoggerFactory.getLogger(LostDogMainService.class);

    private final LostDogRepository repository;

    @Autowired
    public LostDogMainService(LostDogRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<LostDog> GetLostDogs(Specification<LostDog> filters) {
        return repository.findAll(filters);
    }

    @Override
    public LostDog AddLostDog(LostDog dog) {
        return repository.save(dog);
    }
}