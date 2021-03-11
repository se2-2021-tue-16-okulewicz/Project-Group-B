package se.backend.service.empty;

import se.backend.model.EmptyModel;

import java.util.List;

public interface EmptyService {
    /**
     * Get all
     * @return Everything
     */
    List<EmptyModel> getAllItems();
}
