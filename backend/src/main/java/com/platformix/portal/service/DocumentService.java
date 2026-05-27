package com.platformix.portal.service;

import com.platformix.portal.dto.DocumentRequestDto;
import com.platformix.portal.dto.DocumentResponesDto;
import com.platformix.portal.entity.Document;
import com.platformix.portal.repository.DocumentRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DocumentService {

    private final DocumentRepository documentRepository;

    // CREATE
    @Transactional
    public DocumentResponesDto create(DocumentRequestDto requestDto) {
        Document document = toEntity(requestDto);
        Document saved = documentRepository.save(document);
        return toResponseDto(saved);
    }

    // READ — один документ по ID
    @Transactional(readOnly = true)
    public DocumentResponesDto getById(Long id) {
        Document document = documentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Document not found with id: " + id));
        return toResponseDto(document);
    }

    // READ — все документы
    @Transactional(readOnly = true)
    public List<DocumentResponesDto> getAll() {
        return documentRepository.findAll()
                .stream()
                .map(this::toResponseDto)
                .collect(Collectors.toList());
    }


    // ── Маппинг ──────────────────────────────────────────────────────────────

    private Document toEntity(DocumentRequestDto dto) {
        return Document.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .content(dto.getContent())
                .author(dto.getAuthor())
                .build();
    }

    private DocumentResponesDto toResponseDto(Document document) {
        return DocumentResponesDto.builder()
                .id(document.getId())
                .title(document.getTitle())
                .description(document.getDescription())
                .content(document.getContent())
                .author(document.getAuthor())
                .createdAt(document.getCreatedAt())
                .build();
    }
}
