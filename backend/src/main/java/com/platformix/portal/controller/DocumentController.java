package com.platformix.portal.controller;

import com.platformix.portal.dto.DocumentRequestDto;
import com.platformix.portal.dto.DocumentResponesDto;
import com.platformix.portal.service.DocumentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/documents")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentService documentService;

    @GetMapping
    public ResponseEntity<List<DocumentResponesDto>> getAll() {
        List<DocumentResponesDto> documents = documentService.getAll();
        return ResponseEntity.ok(documents);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DocumentResponesDto> getById(@PathVariable Long id) {
        DocumentResponesDto document = documentService.getById(id);
        return ResponseEntity.ok(document);
    }

    @PostMapping
    public ResponseEntity<DocumentResponesDto> create(@Valid @RequestBody DocumentRequestDto requestDto) {
        DocumentResponesDto created = documentService.create(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}
