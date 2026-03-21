# Megantoni Municipal API

API REST para la gestión de trámites municipales del distrito de Megantoni, construida con **Laravel 11**.

## Tecnologías

| Componente     | Tecnología              |
| -------------- | ----------------------- |
| Framework      | Laravel 11              |
| Autenticación  | Laravel Sanctum         |
| Base de datos  | MySQL 8.0               |
| Caché / Colas  | Redis 7                 |
| Almacenamiento | MinIO (compatible S3)   |
| Contenedores   | Docker / Docker Compose |

## Estructura del Proyecto

```
app/
├── Http/
│   ├── Controllers/      # AuthController, TramiteController, DocumentoController, UserController
│   ├── Requests/         # Validación y DTOs (StoreTramiteRequest, UpdateStatusRequest, UploadDocumentoRequest)
│   └── Middleware/       # RoleMiddleware, CompressResponse
├── Services/             # TramiteService, DocumentoService, NotificacionService, AuditService
├── Models/               # User, Tramite, Documento, AuditLog, Procedimiento
├── Jobs/                 # ProcessDocumentJob, SendNotificacionJob, ComprimirArchivoJob
├── Enums/                # TramiteStatus, UserRole
├── Notifications/        # TramiteStatusChanged, TramiteAprobado
└── Policies/             # TramitePolicy, DocumentoPolicy (RBAC)
database/
├── migrations/           # 5 migraciones ordenadas
└── seeders/              # UserSeeder, ProcedimientoSeeder
routes/
├── api.php               # Todos los endpoints REST
└── console.php
config/
├── database.php          # MySQL + Redis
├── queue.php             # Redis driver
├── filesystems.php       # Local + MinIO
└── sanctum.php
```

## Roles y Permisos

| Rol         | Permisos                                      |
| ----------- | --------------------------------------------- |
| CIUDADANO   | Crear trámites, ver propios, subir documentos |
| FUNCIONARIO | Ver todos los trámites, cambiar estado        |
| ADMIN       | Acceso total                                  |

## Estados del Trámite

```
PENDING → IN_REVIEW → APPROVED
                    ↘ REJECTED
```

## Instalación

```bash
# 1. Clonar repositorio
git clone https://github.com/EzerZuniga/Megantoni-Municipal-Api.git
cd Megantoni-Municipal-Api

# 2. Levantar contenedores
docker-compose up -d

# 3. Instalar dependencias
composer install

# 4. Configurar entorno
cp .env .env.local
php artisan key:generate

# 5. Migrar y sembrar base de datos
php artisan migrate --seed
```

## Endpoints Principales

| Método | Ruta                          | Descripción                    | Auth              |
| ------ | ----------------------------- | ------------------------------ | ----------------- |
| POST   | /api/auth/register            | Registro de usuario            | Público           |
| POST   | /api/auth/login               | Inicio de sesión               | Público           |
| POST   | /api/auth/logout              | Cierre de sesión               | Sanctum           |
| GET    | /api/auth/me                  | Perfil del usuario autenticado | Sanctum           |
| GET    | /api/tramites                 | Listar trámites                | Sanctum           |
| POST   | /api/tramites                 | Crear trámite                  | Sanctum           |
| GET    | /api/tramites/{id}            | Ver trámite                    | Sanctum           |
| DELETE | /api/tramites/{id}            | Eliminar trámite               | Admin             |
| PATCH  | /api/tramites/{id}/status     | Cambiar estado                 | Funcionario/Admin |
| GET    | /api/tramites/{id}/documentos | Listar documentos              | Sanctum           |
| POST   | /api/tramites/{id}/documentos | Subir documento (PDF/IMG)      | Sanctum           |
| GET    | /api/documentos/{id}/download | Descargar documento            | Sanctum           |
| DELETE | /api/documentos/{id}          | Eliminar documento             | Sanctum           |
| GET    | /api/users                    | Listar usuarios                | Admin             |

## Variables de Entorno Requeridas

```env
DB_HOST, DB_DATABASE, DB_USERNAME, DB_PASSWORD
REDIS_HOST, REDIS_PORT
MINIO_KEY, MINIO_SECRET, MINIO_BUCKET, MINIO_ENDPOINT
```

## Licencia

Municipalidad Distrital de Megantoni — Uso institucional.
