# NestJS Learning Workspace

A comprehensive workspace containing multiple NestJS projects designed to progressively build knowledge from basic concepts to advanced architectural patterns. Each project focuses on specific NestJS features and best practices.

---

## 🎯 Workspace Overview

This workspace contains 5 different NestJS projects, each serving as a learning milestone:

```
nest-workspace/
├── di/                      # Dependency Injection Deep Dive
├── messages/                # Message Queue & Event-Driven Architecture
├── mini-online-shop/        # Production-Ready E-Commerce Backend
├── mycv/                    # Authentication & Advanced Features
└── scratch/                 # Experimentation & Quick Prototypes
```

---

## 📚 Projects Guide

### 1. **DI Project** 🔌
**Path**: `./di/`

**Focus**: Understanding NestJS Dependency Injection and Service Providers

**What You'll Learn**:
- Dependency Injection Container
- Service providers and scopes
- Constructor injection
- Property-based injection
- Custom providers
- Provider factories

**Key Modules**:
- `computer/` - Main module with controller
- `cpu/` - CPU service
- `disk/` - Disk service
- `power/` - Power service
- `service/` - Generic service utility

**Best For**: Understanding the core IoC container and how NestJS manages dependencies

---

### 2. **Messages Project** 💬
**Path**: `./messages/`

**Focus**: Message Management and Repository Pattern

**What You'll Learn**:
- Repository pattern implementation
- CRUD operations
- Message queuing concepts
- Data persistence
- Event-driven architecture basics

**Key Modules**:
- `messages/` - Message controller, service, and repository

**File Structure**:
```
messages/src/
├── messages/
│   ├── messages.controller.ts
│   ├── messages.controller.spec.ts
│   ├── messages.module.ts
│   ├── messages.repository.ts
│   ├── messages.service.ts
│   └── messages.service.spec.ts
```

**Best For**: Learning data persistence patterns and repository abstraction

---

### 3. **Mini Online Shop** 🛍️
**Path**: `./mini-online-shop/`

**Focus**: Production-Ready Architecture with Database Integration

**What You'll Learn**:
- Complete project structure and scalability
- TypeORM integration with PostgreSQL
- Configuration management with `registerAs()`
- Feature-based module organization
- Domain-driven design patterns
- Async initialization
- Docker Compose setup

**Key Modules**:
- `env/` - Environment configuration and validation
- `database/` - TypeORM setup and connection
- `users/` - User management feature
- `domain/orders/` - Order management feature
- `common/` - Shared utilities

**Database**:
- PostgreSQL with Docker Compose
- TypeORM entities and migrations
- Type-safe configuration

**Architecture Highlights**:
```
mini-online-shop/src/
├── env/               # Configuration with Joi validation
├── database/          # TypeORM initialization
├── users/            # Feature module (CRUD example)
└── domain/orders/    # Domain-driven feature module
```

**Best For**: Building a real-world, scalable backend application with database integration

**Additional Learning**: See [README_DETAILED.md](./mini-online-shop/README_DETAILED.md) for in-depth explanations

---

### 4. **MyCv Project** 📄
**Path**: `./mycv/`

**Focus**: Authentication, Guards, Interceptors, and Advanced Features

**What You'll Learn**:
- Authentication and authorization
- Guards (role-based access control)
- Interceptors (request/response transformation)
- Pipe validation
- Exception handling
- Reporting and aggregation
- Testing strategies

**Key Modules**:
- `users/` - User management with authentication
- `reports/` - Data aggregation and reporting
- `guards/` - Authorization guards
- `interceptors/` - Cross-cutting concerns

**Best For**: Understanding middleware concepts and advanced request processing

---

### 5. **Scratch Project** ✏️
**Path**: `./scratch/`

**Focus**: Quick Experimentation and Prototyping

**What You'll Learn**:
- Rapid prototyping
- Testing new features
- Sandbox for learning

**Best For**: Trying out new concepts without affecting other projects

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16+)
- **npm** or **yarn**
- **PostgreSQL** (for mini-online-shop)
- **Docker & Docker Compose** (optional, for containerized PostgreSQL)

### Installation

1. **Clone or navigate to the workspace**:
   ```bash
   cd nest-workspace
   ```

2. **Install dependencies for a specific project**:
   ```bash
   cd mini-online-shop
   npm install
   ```

### Running Each Project

#### DI Project
```bash
cd di
npm install
npm run start:dev
```

#### Messages Project
```bash
cd messages
npm install
npm run start:dev
```

#### Mini Online Shop
```bash
cd mini-online-shop
npm install
docker-compose up -d    # Start PostgreSQL
npm run start:dev
```

#### MyCv Project
```bash
cd mycv
npm install
npm run start:dev
```

#### Scratch Project
```bash
cd scratch
npm install
npm run start:dev
```

---

## 📖 NestJS Learning Path

Follow this structured path to progressively build NestJS expertise:

### Level 1: Fundamentals
**Start with**: `di/` project

- [ ] Understand modules (@Module)
- [ ] Learn services (@Injectable)
- [ ] Learn controllers (@Controller)
- [ ] Understand dependency injection
- [ ] Study service providers

### Level 2: Request/Response
**Move to**: `messages/` project

- [ ] Implement controllers with routes
- [ ] Use DTOs for type safety
- [ ] Implement repository pattern
- [ ] Handle CRUD operations
- [ ] Add basic validation

### Level 3: Database & Configuration
**Progress to**: `mini-online-shop/` project

- [ ] Setup TypeORM with PostgreSQL
- [ ] Configure environment variables
- [ ] Use registerAs() for configuration
- [ ] Implement entities and relationships
- [ ] Understand async initialization
- [ ] Organize code by features

### Level 4: Advanced Features
**Continue with**: `mycv/` project

- [ ] Implement authentication
- [ ] Create guards for authorization
- [ ] Use interceptors for cross-cutting concerns
- [ ] Handle exceptions globally
- [ ] Implement pipes for validation
- [ ] Write comprehensive tests

### Level 5: Experimentation
**Use**: `scratch/` project

- [ ] Try new patterns
- [ ] Test edge cases
- [ ] Prototype features

---

## 🔑 Core NestJS Concepts

### Decorators

| Decorator | Purpose |
|-----------|---------|
| `@Module` | Defines a module |
| `@Controller` | Defines a controller (route handler) |
| `@Injectable` | Marks a class as a provider (can be injected) |
| `@Get`, `@Post`, `@Patch`, `@Delete` | HTTP method handlers |
| `@Param`, `@Query`, `@Body` | Extract request data |
| `@UseGuards` | Apply guards to routes |
| `@UseInterceptors` | Apply interceptors |
| `@UsePipes` | Apply pipes |

### Providers

```typescript
// Service-based provider
@Injectable()
export class MyService {}

// Factory provider
const myProvider = {
  provide: 'MY_SERVICE',
  useFactory: () => new MyService(),
};

// Value provider
const myProvider = {
  provide: 'CONFIG',
  useValue: { key: 'value' },
};
```

### Dependency Injection

```typescript
// Constructor-based injection
@Controller()
export class MyController {
  constructor(private readonly myService: MyService) {}
}

// Property-based injection
@Injectable()
export class MyService {
  @Inject('MY_PROVIDER')
  private myProvider: any;
}
```

### Module Imports

```typescript
@Module({
  imports: [OtherModule],      // Import other modules
  controllers: [MyController],  // Define controllers
  providers: [MyService],       // Define services
  exports: [MyService],         // Export for use in other modules
})
export class MyModule {}
```

---

## 🧪 Testing

Each project follows a testing structure:

```bash
# Unit tests
npm test

# Watch mode
npm test:watch

# Coverage
npm test:cov

# E2E tests
npm run test:e2e
```

**Test Files**:
- `*.spec.ts` - Unit tests
- `test/*.e2e-spec.ts` - End-to-end tests

---

## 📁 Common Project Structure

Most projects follow this structure:

```
project/
├── src/
│   ├── main.ts                 # Entry point
│   ├── app.module.ts           # Root module
│   ├── app.controller.ts       # Root controller
│   ├── app.service.ts          # Root service
│   │
│   ├── feature-name/           # Feature module
│   │   ├── dto/                # Data Transfer Objects
│   │   ├── entities/           # Database entities (TypeORM)
│   │   ├── feature.controller.ts
│   │   ├── feature.service.ts
│   │   ├── feature.module.ts
│   │   └── feature.service.spec.ts
│   │
│   └── common/                 # Shared utilities
│       ├── guards/
│       ├── interceptors/
│       └── pipes/
│
├── test/                       # E2E tests
├── dist/                       # Compiled output
├── package.json
├── tsconfig.json
├── nest-cli.json
└── README.md
```

---

## 🔨 Common Commands

### Development
```bash
npm run start        # Start the application
npm run start:dev    # Start in watch mode
npm run start:debug  # Start with debugger
```

### Building
```bash
npm run build        # Build for production
npm run start:prod   # Run production build
```

### Code Quality
```bash
npm run lint         # Run ESLint
npm run format       # Format with Prettier
```

### Testing
```bash
npm test             # Run tests once
npm test:watch       # Watch mode
npm test:cov         # Coverage report
npm run test:e2e     # E2E tests
```

---

## 🎓 Key Learning Objectives

### By completing this workspace, you'll understand:

✅ **Fundamental Concepts**
- How NestJS structures applications with modules
- Dependency injection and the IoC container
- Services and controllers

✅ **Data Management**
- Repository pattern
- CRUD operations
- Data validation with DTOs

✅ **Database Integration**
- TypeORM basics and entities
- Database configuration
- Async initialization

✅ **Advanced Patterns**
- Guards for authorization
- Interceptors for cross-cutting concerns
- Pipes for validation
- Exception handling

✅ **Best Practices**
- Feature-based organization
- Domain-driven design
- Configuration management
- Testing strategies

✅ **Scalability**
- Module organization
- Separation of concerns
- Reusable patterns

---

## 📚 Resources

### Official Documentation
- [NestJS Official Docs](https://docs.nestjs.com)
- [TypeORM Documentation](https://typeorm.io)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

### Key Topics
- [NestJS Modules](https://docs.nestjs.com/modules)
- [NestJS Providers](https://docs.nestjs.com/providers)
- [NestJS Controllers](https://docs.nestjs.com/controllers)
- [NestJS Database Integration](https://docs.nestjs.com/recipes/sql-typeorm)
- [NestJS Guards](https://docs.nestjs.com/guards)
- [NestJS Interceptors](https://docs.nestjs.com/interceptors)

---

## 💡 Tips for Learning

1. **Start Simple**: Begin with the `di/` project to understand basics
2. **Code Along**: Don't just read - actively write and experiment
3. **Use Scratch Project**: Test new ideas before implementing in real projects
4. **Read Tests**: Test files show how components should be used
5. **Debug**: Use `npm run start:debug` to step through code
6. **Experiment**: Modify code and see what breaks
7. **Ask Questions**: NestJS community is active and helpful

---

## 🔄 Recommended Study Order

**Week 1**: DI Project
- Understand IoC container
- Learn service injection
- Practice basic patterns

**Week 2**: Messages Project
- Build CRUD operations
- Implement repository pattern
- Add validation

**Week 3-4**: Mini Online Shop
- Setup PostgreSQL
- Learn TypeORM
- Organize features
- Handle configuration

**Week 5-6**: MyCv Project
- Implement authentication
- Use guards and interceptors
- Handle advanced scenarios
- Master testing

**Ongoing**: Scratch Project
- Experiment with new ideas
- Test edge cases
- Build mini-projects

---

## 🚀 Next Steps After This Workspace

Once you've completed all projects:

1. **Add Real Features**
   - Authentication with JWT
   - File uploads
   - Pagination and filtering
   - Search functionality

2. **Add Advanced Patterns**
   - Caching with Redis
   - Message queues
   - Microservices
   - GraphQL

3. **DevOps & Deployment**
   - Docker containerization
   - CI/CD pipelines
   - Kubernetes orchestration
   - Cloud deployment

4. **Performance**
   - Query optimization
   - Database indexing
   - Caching strategies
   - Load testing

5. **Security**
   - API authentication
   - Role-based access control
   - Input validation
   - Rate limiting

---

## 📝 Notes

- Each project has its own `package.json` - install dependencies per project
- PostgreSQL is containerized with Docker Compose in `mini-online-shop`
- All projects use TypeScript and Jest for testing
- ESLint and Prettier are configured for code quality

---

## ❓ Troubleshooting

### Port Already in Use
```bash
# Find process on port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

### PostgreSQL Connection Issues
```bash
# Check if container is running
docker-compose ps

# View logs
docker-compose logs postgres

# Restart container
docker-compose restart postgres
```

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📞 Support

For NestJS questions:
- [NestJS Discord](https://discord.gg/nestjs)
- [GitHub Issues](https://github.com/nestjs/nest/issues)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/nestjs)

---

**Happy Learning! 🚀**

Start with the DI project and progressively move through each one to build comprehensive NestJS expertise.
