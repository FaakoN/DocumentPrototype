package com.platformix.portal.controller;

import com.platformix.portal.dto.DocumentRequestDto;
import com.platformix.portal.dto.DocumentResponesDto;
import com.platformix.portal.service.DocumentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/documents")
@RequiredArgsConstructor
@Tag(name = "Documents", description = "API для управления документами")
public class DocumentController {

    private final DocumentService documentService;

    @Operation(summary = "Получить все документы")
    @ApiResponse(responseCode = "200", description = "Список документов")
    @GetMapping("/")
    public ResponseEntity<List<DocumentResponesDto>> getAll() {
        List<DocumentResponesDto> documents = documentService.getAll();
        return ResponseEntity.ok(documents);
    }

    @Operation(summary = "Получить документ по ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Документ найден"),
            @ApiResponse(responseCode = "404", description = "Документ не найден")
    })
    @GetMapping("/{id}")
    public ResponseEntity<DocumentResponesDto> getById(
            @Parameter(description = "ID документа") @PathVariable Long id) {
        DocumentResponesDto document = documentService.getById(id);
        return ResponseEntity.ok(document);
    }

    @Operation(summary = "Создать новый документ")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Документ создан"),
            @ApiResponse(responseCode = "400", description = "Ошибка валидации")
    })
    @PostMapping("/")
    public ResponseEntity<DocumentResponesDto> create(
            @Valid @RequestBody DocumentRequestDto requestDto) {
        DocumentResponesDto created = documentService.create(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}
