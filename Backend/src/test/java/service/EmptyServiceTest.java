package service;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.test.context.junit4.SpringRunner;
import se.backend.dao.EmptyRepository;
import se.backend.model.EmptyModel;
import se.backend.service.empty.EmptyMainService;
import se.backend.service.empty.EmptyService;

import java.util.Collections;

import static org.junit.jupiter.api.Assertions.assertEquals;

@RunWith(SpringRunner.class)
class EmptyServiceTest {

    private static EmptyService emptyService;

    private static EmptyRepository emptyRepository;

    @BeforeAll
    public static void setupMock() {
        emptyRepository = Mockito.mock(EmptyRepository.class);
        emptyService = new EmptyMainService(emptyRepository);
    }

    @BeforeEach
    public void setupGetAll() {
        EmptyModel item = new EmptyModel();
        item.setName("Name");

        Mockito.when(emptyRepository.findAll()).thenReturn(Collections.singletonList(item));
    }

    @Test
    public void ExampleTest() {
        var allItems = emptyService.getAllItems();

        assertEquals(allItems.get(0).getName(), "Name");
    }

}