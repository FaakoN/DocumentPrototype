package com.platformix.portal.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DocumentResponesDto {

    private Long id;
    private String title;
    private String description;
    private String content;
    private String author;
    private LocalDateTime createdAt;
}
