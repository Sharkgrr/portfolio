package dev.raphaela.portfolio;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

  @GetMapping
  public ProfileResponse profile() {
    return new ProfileResponse(
        "Raphaela Oliveira",
        "Software Engineer",
        List.of("Java", "Kotlin", "React", "Databricks", "REST APIs"));
  }

  public record ProfileResponse(String name, String role, List<String> stack) {}
}
