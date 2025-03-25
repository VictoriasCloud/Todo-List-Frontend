# Todo List

Frontend-приложение Todo List с использованием API: https://cms.laurence.host/api

## Описание:
Приложение реализовано на React с использованием TypeScript, Zustand для управления состоянием. Оно позволяет добавлять, редактировать, удалять задачи, изменять их статус, фильтровать задачи. Также приложение поддерживает скроллинг. Уникальность заключается в использовании анимаций через Framer Motion: анимация букв в заголовке(при первичном запуске приложения и при нажатии на буквы), плавное добавление/удаление задач, анимация завершения задачи в виде салюта, пометки задачи как избранной(звездочка начинает сиять), а также увеличение карточки задачи при наведении курсора. 
Для UI используется Ant Design, а для стилизации — Styled Components. взаимодействие API реализовано через Axios, а избранные задачи сохраняются в localStorage. Архитектура приложения модульная, с четким разделением компонентов придерживаясь паттернов архитектуры Frontend-приложений, что упрощает масштабирование.

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

## Тестирование

В проекте используются Vitest и Testing Library для юнит-тестов.

src/components/TodoItem.test.tsx

- Отображение заголовка и описания задачи

- Переход к редактированию задачи при нажатии на иконку редактирования.

- Удаление задачи при нажати на иконку удаления

- Завершение задачи

- Возврат задачи из статуса "завершенной" в статус "активной"

- Тестирование отображения визуального эффекта при завершении задачи

- Добавление задачи в избранное

- Удаление задачи из избранного

src/store/TodosStore.test.ts

- Добавление задачи в список всех задач(с имитацией апи чтобы не зависеть от сервера)

src/components/buttons/TodoFilterAndCreateButton.test.tsx

- Фильтрация задач по кнопкам

### Запуск тестов:

```bash
npm run test
