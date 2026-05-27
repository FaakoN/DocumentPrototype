package com.platformix.portal.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Ответ с данными документа")
public class DocumentResponesDto {

    @Schema(description = "ID документа", example = "1")
    private Long id;

    @Schema(description = "Заголовок документа", example = "Технический отчёт Q1")
    private String title;

    @Schema(description = "Описание документа")
    private String description;

    @Schema(description = "Содержимое документа")
    private String content;

    @Schema(description = "Автор документа", example = "Иван Иванов")
    private String author;

    @Schema(description = "Дата и время создания")
    private LocalDateTime createdAt;
}
