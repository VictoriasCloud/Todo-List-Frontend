# Todo List

Проект Todo List с использованием API: https://cms.laurence.host/api

## Описание:
Приложение реализовано на React с использованием TypeScript, Zustand для управления состоянием. Оно позволяет добавлять, редактировать, удалять задачи, изменять их статус, фильтровать задачи. Также приложение поддерживает скроллинг. Уникальность заключается в использовании анимаций через Framer Motion: анимация букв в заголовке(при первичном запуске приложения и при нажатии на буквы), плавное появление/удаление задач, анимация завершения задачи в виде салюта, пометки задачи как избранной(звездочка сияет), а такжек увеличение карточки задачи при наведении. Для UI используется Ant Design, а для стилизации — Styled Components. API взаимодействие реализовано через Axios, а избранные задачи сохраняются в localStorage. Архитектура приложения модульная, с четким разделением компонентов придерживаясь паттернов архитектуры Frontend-приложений, что упрощает поддержку и масштабирование.

## Стек:
- React + TypeScript
- Zustand (State manager)
- Ant Design + Styled Components
- Vite + Framer Motion

## Функционал:
- Добавление задачи
- Удаление задачи
- Получение списка всех задач
- Изменение статуса (выполнено / активно)
- Infinite Scroll
- Избранное (сохраняется в localStorage, отображаться даже после обновления страницы)
- Фильтрация задач
- Редактирование задач

## Установка и запуск:

```bash
npm install
npm start
```