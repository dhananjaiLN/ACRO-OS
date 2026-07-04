# Adaptive Cloud Resource Orchestrator (ACRO OS)

Adaptive Cloud Resource Orchestrator (ACRO OS) is a full-stack cloud resource scheduling and operating system analytics platform that combines configurable cloud infrastructure simulation with real-time operating system monitoring.

Unlike traditional CPU scheduling simulators that execute algorithms on static datasets, ACRO OS provides an interactive environment capable of evaluating scheduling strategies using both simulated cloud workloads and live operating system processes. The platform integrates workload generation, adaptive scheduling, system monitoring, analytics, visualization, and report generation into a single modular architecture.

The project has been designed as a complete scheduling laboratory where users can configure cloud environments, simulate workload execution, compare scheduling algorithms, monitor live system resources, analyse scheduler performance, and generate detailed analytical reports through an intuitive web interface.

---

# Project Status

ACRO OS currently supports:

- Configurable cloud resource simulation
- Host and Virtual Machine management
- Dynamic workload generation
- Multiple simulation scenarios
- Adjustable workload intensity profiles
- Tick-based simulation engine
- Adaptive scheduling framework
- Five CPU scheduling algorithms
- Scheduler comparison and recommendation
- Real-time operating system monitoring
- Live process adaptation
- CPU, Memory, Disk and Network monitoring
- WebSocket-based live updates
- Interactive analytics dashboard
- Performance comparison charts
- PDF report generation
- Modular REST API backend
- Responsive React frontend

This implementation demonstrates a complete cloud scheduling workflow beginning from workload generation and simulation, continuing through scheduler execution and adaptive decision making, and concluding with analytics, visualization, and report generation.

---

# Why ACRO OS?

Traditional operating system scheduling simulators generally execute algorithms on predefined workloads without considering the continuously changing behaviour of modern computing systems.

Similarly, cloud scheduling simulators often ignore live operating system resource utilization and provide limited analytical capabilities.

ACRO OS bridges this gap by combining cloud simulation with real-time operating system monitoring.

The platform enables developers, students, and researchers to evaluate scheduling algorithms under configurable cloud environments while simultaneously analysing scheduler performance using live operating system workloads collected directly from the host machine.

The modular architecture also allows new scheduling algorithms, simulation models, monitoring modules, and visualization components to be integrated with minimal changes to the existing codebase.

---

# Core Features

## Cloud Simulation

- Dynamic host creation
- Virtual machine lifecycle management
- Configurable workload generation
- Multiple simulation scenarios
- Adjustable load intensity profiles
- Tick-based execution engine
- Resource allocation simulation
- Cloud infrastructure modelling

---

## Adaptive Scheduling

- Workload characteristic analysis
- Automatic scheduler recommendation
- Comparative scheduler evaluation
- Dynamic scheduling selection
- Performance-based scheduler ranking

---

## Scheduling Algorithms

- First Come First Serve (FCFS)
- Shortest Job First (SJF)
- Priority Scheduling
- Round Robin
- Multi-Level Feedback Queue (MLFQ)

---

## Live Operating System Monitoring

- CPU utilization monitoring
- Memory monitoring
- Disk utilization monitoring
- Network activity monitoring
- Live process monitoring
- Top resource consuming processes
- Operating system information
- Resource utilization history
- Continuous WebSocket streaming

---

## Performance Analytics

- Waiting Time
- Turnaround Time
- Response Time
- Throughput
- CPU Utilization
- Scheduler comparison
- Performance visualization
- Analytics dashboard
- PDF report generation

---

## Frontend Dashboard

- Dashboard overview
- Cluster management
- Host management
- Virtual Machine management
- Scheduler Analysis
- Live System Monitor
- Analytics
- Architecture visualization
- System configuration
- Real-time updates

# Technology Stack

| Layer | Technology | Purpose |
|--------|------------|---------|
| Frontend | React, Vite, Tailwind CSS | Interactive web dashboard and visualization |
| Backend | FastAPI, Python | REST APIs, simulation engine, scheduler execution, analytics |
| Real-Time Communication | WebSockets | Live operating system monitoring and dashboard updates |
| Scheduling | FCFS, SJF, Priority, Round Robin, MLFQ | CPU scheduling and workload execution |
| Monitoring | psutil | CPU, Memory, Disk, Network and Process monitoring |
| Visualization | Recharts, React Circular Progressbar | Performance analytics and live charts |
| Reporting | ReportLab | PDF report generation |
| Simulation | Custom Simulation Engine | Host, VM, workload and cloud infrastructure simulation |

---

# System Architecture

The project follows a modular layered architecture where each subsystem is responsible for a single domain of the scheduling platform.

```

                                   ACRO OS

                           React Dashboard (Frontend)
                                         │
                    ┌────────────────────┴────────────────────┐
                    │                                         │
              REST API Requests                      WebSocket Stream
                    │                                         │
                    └────────────────────┬────────────────────┘
                                         │
                                  FastAPI Backend
                                         │
      ┌──────────────┬──────────────┬──────────────┬──────────────┐
      │              │              │              │              │
      ▼              ▼              ▼              ▼              ▼

 Simulation     Scheduling     Monitoring     Analytics     Reporting
   Engine          Engine         Engine         Engine        Engine

      │              │              │
      │              │              │
      ▼              ▼              ▼

  Hosts        FCFS Scheduler     CPU

  Virtual      SJF Scheduler      Memory

  Machines      Priority          Disk

  Workloads   Round Robin        Network

 Scenarios       MLFQ           Processes

                  │

         Adaptive Scheduler

```

---

# Overall Workflow

The execution flow within ACRO OS consists of four major stages:

1. Cloud infrastructure simulation.
2. Scheduler execution.
3. Performance evaluation.
4. Live system monitoring and visualization.

```

        User Configuration

               │

               ▼

      Cloud Simulation Engine

               │

        Host Allocation

               │

      Virtual Machine Creation

               │

      Workload Generation

               │

               ▼

      Adaptive Scheduler

               │

      ┌────────┼─────────────┐
      │        │             │

    FCFS      SJF        Priority

      │

 Round Robin

      │

    MLFQ

               │

               ▼

      Metrics Engine

               │

               ▼

      Analytics Engine

               │

               ▼

     React Dashboard

```

---

# Cloud Simulation Architecture

The simulation engine models a simplified cloud computing environment consisting of hosts, virtual machines, workloads, and scheduling policies.

```

Simulation Configuration

          │

          ▼

Simulation Engine

          │

 ┌────────┼──────────┐

 │        │          │

 ▼        ▼          ▼

Hosts     Virtual    Workloads

Machines

 │

 ▼

Scheduler

 │

 ▼

Performance Metrics

 │

 ▼

Simulation Results

```

---

# Live Monitoring Architecture

Unlike conventional scheduling simulators, ACRO OS continuously monitors the host operating system using live system statistics.

```

Operating System

        │

        ▼

psutil Monitoring Layer

        │

 ┌──────┼───────────────┐

 │      │       │       │

 ▼      ▼       ▼       ▼

CPU   Memory   Disk   Network

               │

               ▼

Process Monitor

               │

               ▼

Monitoring Collector

               │

               ▼

FastAPI WebSocket

               │

               ▼

React Dashboard

```

---

# Adaptive Scheduling Pipeline

One of the primary objectives of ACRO OS is selecting the most suitable scheduling algorithm for a given workload rather than executing a single scheduler.

```

Incoming Workloads

        │

        ▼

Adaptive Scheduler

        │

        ▼

Workload Analysis

        │

 ┌──────┼───────────────┐

 │      │       │       │

 ▼      ▼       ▼       ▼

FCFS    SJF   Priority  RR

                │

                ▼

              MLFQ

                │

                ▼

Performance Comparison

                │

                ▼

Scheduler Recommendation

```

---

# Major Subsystems

ACRO OS consists of six independent modules.

| Module | Responsibility |
|---------|----------------|
| Simulation Engine | Creates cloud infrastructure, workloads and execution scenarios. |
| Scheduling Engine | Executes scheduling algorithms and computes execution order. |
| Adaptive Scheduler | Selects the optimal scheduling strategy based on workload characteristics. |
| Monitoring Engine | Collects live operating system statistics using psutil. |
| Analytics Engine | Computes scheduler metrics and comparative performance analysis. |
| Reporting Engine | Generates downloadable PDF performance reports. |

# Project Structure

```
ACRO-OS/

├── backend/
│
│   ├── api/
│   │   ├── cluster_routes.py
│   │   ├── vm_routes.py
│   │   ├── scheduler_routes.py
│   │   ├── analytics_routes.py
│   │   ├── report_routes.py
│   │   └── monitoring_routes.py
│   │
│   ├── monitoring/
│   │   ├── monitoring_collector.py
│   │   ├── system_monitor.py
│   │   ├── process_monitor.py
│   │   └── resource_monitor.py
│   │
│   ├── scheduling/
│   │   ├── scheduler_runner.py
│   │   ├── adaptive_scheduler.py
│   │   ├── fcfs.py
│   │   ├── sjf.py
│   │   ├── priority.py
│   │   ├── round_robin.py
│   │   ├── mlfq.py
│   │   └── metrics.py
│   │
│   ├── simulation/
│   │   ├── simulation_engine.py
│   │   ├── workload_generator.py
│   │   ├── simulation_config.py
│   │   ├── simulation_clock.py
│   │   ├── simulation_scenarios.py
│   │   ├── host.py
│   │   ├── virtual_machine.py
│   │   ├── workload.py
│   │   └── cluster.py
│   │
│   ├── analytics/
│   │   ├── analytics_engine.py
│   │   ├── scheduler_analysis.py
│   │   └── comparison.py
│   │
│   ├── reports/
│   │   └── pdf_generator.py
│   │
│   ├── websocket/
│   │   └── live_monitor.py
│   │
│   ├── process_adapter.py
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│
│   ├── src/
│   │
│   ├── acro/
│   │
│   │   ├── components/
│   │   │
│   │   ├── charts/
│   │   │
│   │   ├── pages/
│   │   │
│   │   ├── services/
│   │   │
│   │   ├── layouts/
│   │   │
│   │   ├── hooks/
│   │   │
│   │   └── utils/
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── vite.config.js
│
├── docs/
│
├── screenshots/
│
└── README.md

```

---

# Backend Modules

| Module | Responsibility |
|---------|----------------|
| api | Exposes REST APIs for simulation control, scheduler execution, analytics, reporting, and infrastructure management. |
| simulation | Models cloud infrastructure, workload generation, hosts, virtual machines, execution ticks, and simulation scenarios. |
| scheduling | Executes scheduling algorithms, adaptive scheduler logic, and performance metric computation. |
| monitoring | Collects live CPU, memory, disk, network, and process statistics from the host operating system. |
| analytics | Performs scheduler comparison, workload analysis, and statistical performance evaluation. |
| reports | Generates downloadable PDF scheduler reports and analytics summaries. |
| websocket | Streams live monitoring data from the backend to the React dashboard in real time. |

---

# Frontend Modules

| Module | Responsibility |
|---------|----------------|
| components | Reusable UI components shared across the application. |
| pages | Individual application pages including Dashboard, Cluster, Virtual Machines, Analytics, Scheduler Analysis, Live Monitor, Architecture, and Settings. |
| charts | Interactive Recharts-based visualizations used for scheduler comparison and live analytics. |
| services | REST API and WebSocket communication layer between the frontend and backend. |
| layouts | Shared layouts including navigation sidebar and application shell. |
| hooks | Custom React hooks for state management and real-time updates. |
| utils | Common helper functions and utility methods. |

---

# Important Backend Files

| File | Responsibility |
|------|----------------|
| backend/main.py | Starts the FastAPI application, registers REST APIs, and initializes WebSocket endpoints. |
| monitoring/monitoring_collector.py | Aggregates all live monitoring information before streaming it to the frontend. |
| monitoring/system_monitor.py | Collects CPU, memory, disk, swap, and operating system information using psutil. |
| monitoring/process_monitor.py | Retrieves live process statistics and identifies top resource-consuming processes. |
| monitoring/resource_monitor.py | Collects network activity and disk I/O statistics. |
| process_adapter.py | Converts live operating system processes into scheduler-compatible workloads. |
| simulation/workload_generator.py | Generates configurable workloads based on simulation scenarios and load intensities. |
| simulation/simulation_engine.py | Controls simulation execution, tick progression, workload scheduling, and resource allocation. |
| simulation/simulation_clock.py | Maintains the simulation clock and execution timeline. |
| scheduling/adaptive_scheduler.py | Analyses workload characteristics and recommends the optimal scheduling algorithm. |
| scheduling/scheduler_runner.py | Executes scheduling algorithms and computes execution metrics. |
| scheduling/fcfs.py | First Come First Serve scheduling implementation. |
| scheduling/sjf.py | Shortest Job First scheduling implementation. |
| scheduling/priority.py | Priority Scheduling implementation. |
| scheduling/round_robin.py | Round Robin scheduling implementation. |
| scheduling/mlfq.py | Multi-Level Feedback Queue scheduling implementation. |

---

# Important Frontend Files

| File | Responsibility |
|------|----------------|
| App.jsx | Defines the application routes and global layout. |
| Dashboard.jsx | Displays the overall cloud infrastructure overview. |
| Cluster.jsx | Manages cloud hosts and infrastructure resources. |
| VirtualMachines.jsx | Displays and manages virtual machine instances. |
| SchedulerAnalysis.jsx | Visualizes scheduler comparison metrics and algorithm recommendations. |
| LiveMonitor.jsx | Displays real-time CPU, memory, disk, network, and process statistics streamed from the backend. |
| Analytics.jsx | Presents scheduler analytics and workload performance visualizations. |
| Architecture.jsx | Explains the complete ACRO OS architecture and execution pipeline. |
| Settings.jsx | Allows users to configure simulation parameters before execution. |
| LiveMonitorService.js | Manages persistent WebSocket communication with the FastAPI backend. |
| SchedulerComparisonChart.jsx | Displays comparative scheduling performance using interactive charts. |

# Core System Modules

ACRO OS has been designed using a modular architecture where every subsystem performs a single responsibility while communicating through well-defined interfaces. This separation enables new scheduling algorithms, simulation models, monitoring modules, and visualization components to be integrated without affecting the rest of the platform.

---

# Cloud Simulation Engine

The Cloud Simulation Engine provides a configurable virtual cloud environment used for evaluating resource scheduling algorithms under different workload conditions.

Instead of executing scheduling algorithms on predefined datasets, ACRO OS creates a complete simulation consisting of hosts, virtual machines, workloads, execution ticks, and resource allocation policies.

The simulation engine manages the entire execution lifecycle, including workload generation, VM creation, scheduler invocation, metric collection, and simulation completion.

## Responsibilities

- Cloud infrastructure modelling
- Host resource management
- Virtual machine lifecycle management
- Dynamic workload generation
- Simulation clock management
- Tick-based execution
- Simulation scenario management
- Resource allocation
- Scheduler invocation

### Simulation Pipeline

```

Simulation Configuration

        │

        ▼

Simulation Engine

        │

        ▼

Host Creation

        │

        ▼

VM Allocation

        │

        ▼

Workload Generation

        │

        ▼

Scheduling Engine

        │

        ▼

Metrics Collection

        │

        ▼

Analytics Dashboard

```

---

# Workload Generator

The workload generator produces configurable virtual machine workloads that emulate different cloud computing environments.

Rather than relying on fixed execution datasets, workloads are generated dynamically based on the selected simulation scenario and workload intensity.

Each generated workload contains scheduling attributes such as:

- CPU demand
- Memory demand
- Execution time
- Priority
- Weight
- CPU SLA
- Memory SLA
- Arrival time
- Workload category

Supported workload profiles include:

- Web Server
- Database
- Microservices
- AI Inference
- Batch Processing

Simulation scenarios currently include:

- Mixed
- Enterprise
- AI Cluster
- Database
- Microservices

Load intensity profiles:

- Light
- Normal
- Heavy
- Extreme

---

# Scheduling Engine

The Scheduling Engine executes scheduling algorithms independently of the simulation engine.

This modular separation allows additional algorithms to be integrated without modifying the simulation framework.

Each scheduler receives a workload queue and produces execution statistics including completion time, waiting time, turnaround time, response time, throughput, and CPU utilization.

Implemented scheduling algorithms include:

- First Come First Serve (FCFS)
- Shortest Job First (SJF)
- Priority Scheduling
- Round Robin
- Multi-Level Feedback Queue (MLFQ)

```

Incoming Workloads

        │

        ▼

Scheduling Engine

        │

 ┌──────┼─────────────────────────┐

 │      │      │       │          │

 ▼      ▼      ▼       ▼          ▼

FCFS   SJF  Priority   RR       MLFQ

        │

        ▼

Execution Metrics

```

---

# Adaptive Scheduling Framework

One of the primary objectives of ACRO OS is to evaluate workload behaviour rather than execute a single scheduling algorithm.

The Adaptive Scheduling Framework analyses workload characteristics and executes multiple scheduling strategies before recommending the scheduler that delivers the most favourable performance.

Scheduler recommendations are based on comparative evaluation of:

- Average Waiting Time
- Average Turnaround Time
- Average Response Time
- Throughput
- CPU Utilization

This enables objective comparison of scheduling algorithms under identical workload conditions.

### Adaptive Scheduling Workflow

```

Generated Workloads

        │

        ▼

Scheduler Execution

        │

 ┌──────┼──────────────────────┐

 │      │      │       │       │

 ▼      ▼      ▼       ▼       ▼

FCFS   SJF  Priority   RR    MLFQ

        │

        ▼

Performance Metrics

        │

        ▼

Analytics Engine

        │

        ▼

Best Scheduler Recommendation

```

---

# Live Monitoring Engine

The Live Monitoring Engine continuously collects operating system statistics using **psutil** and streams them to the frontend through WebSockets.

Unlike traditional scheduling simulators that rely solely on synthetic workloads, ACRO OS supports evaluation using real operating system processes.

The monitoring engine periodically gathers:

- CPU utilization
- Memory usage
- Disk utilization
- Network statistics
- Process statistics
- Top resource-consuming processes
- Operating system information

These metrics are aggregated before being streamed to the frontend, ensuring consistent updates across all dashboard components.

### Live Monitoring Pipeline

```

Operating System

        │

        ▼

System Monitor

Process Monitor

Resource Monitor

        │

        ▼

Monitoring Collector

        │

        ▼

WebSocket Server

        │

        ▼

React Dashboard

```

---

# Process Adapter

The Process Adapter bridges the gap between live operating system processes and the scheduling engine.

Instead of creating synthetic workloads, the adapter converts active system processes into scheduler-compatible process models.

Each adapted process contains:

- Process ID
- Process name
- Arrival time
- Estimated burst time
- CPU utilization
- Memory utilization
- Thread count
- Scheduling priority

This allows scheduling algorithms to evaluate real operating system workloads using the same execution pipeline employed for simulated cloud environments.

---

# Metrics Engine

The Metrics Engine computes scheduler performance after every execution.

Computed metrics include:

- Average Waiting Time
- Average Turnaround Time
- Average Response Time
- Throughput
- CPU Utilization
- Total Executed Processes
- Scheduler Ranking

These metrics are consumed by the Analytics Engine and displayed within the Scheduler Analysis dashboard.

# Frontend Architecture

The frontend is developed using **React** and **Vite**, providing a responsive single-page application that enables users to configure simulations, monitor live operating system resources, analyse scheduling algorithms, and visualize performance metrics.

The application follows a modular component-based architecture where each page is responsible for a specific subsystem of ACRO OS.

## Frontend Pages

| Page | Responsibility |
|------|----------------|
| Dashboard | Displays an overview of the cloud infrastructure and scheduling platform. |
| Cluster | Visualizes hosts, available resources, and infrastructure information. |
| Virtual Machines | Displays active virtual machines and resource allocation. |
| Scheduler Analysis | Executes scheduler comparison and displays performance metrics. |
| Live Monitor | Streams real-time CPU, memory, disk, network, and process statistics from the backend. |
| Analytics | Displays scheduler performance charts and comparative visualizations. |
| Architecture | Documents the complete ACRO OS architecture and execution pipeline. |
| Settings | Configures simulation parameters, workload generation, and scheduling options. |

---

# Backend Architecture

The backend is implemented using **FastAPI** and follows a modular service-oriented architecture.

Instead of placing all functionality within a single application layer, ACRO OS separates simulation, scheduling, monitoring, analytics, reporting, and communication into independent modules.

This modular design enables each subsystem to evolve independently while maintaining clear interfaces between components.

## Backend Services

| Service | Responsibility |
|---------|----------------|
| Simulation Service | Controls simulation lifecycle, workload generation, and cloud execution. |
| Scheduler Service | Executes scheduling algorithms and computes execution metrics. |
| Monitoring Service | Collects live operating system statistics using psutil. |
| Analytics Service | Computes comparative scheduler performance and statistical analysis. |
| Reporting Service | Generates downloadable PDF reports. |
| WebSocket Service | Streams live monitoring updates to the frontend. |

---

# REST API Design

The frontend communicates with the backend through REST APIs for configuration, simulation control, scheduler execution, analytics retrieval, and infrastructure management.

The REST layer exposes independent endpoints for each subsystem, allowing frontend components to interact with specific services without tightly coupling application logic.

Typical API responsibilities include:

- Starting and stopping simulations
- Cluster management
- Host management
- Virtual machine management
- Scheduler execution
- Scheduler comparison
- Analytics retrieval
- Report generation
- System configuration

The REST architecture follows a resource-oriented design, enabling future extensions with minimal changes to existing endpoints.

---

# WebSocket Communication

Unlike conventional request-response architectures, ACRO OS uses persistent WebSocket connections to deliver live operating system statistics without requiring repeated client polling.

Once a WebSocket connection is established, the backend continuously streams monitoring data collected from the Monitoring Engine.

This approach provides significantly lower latency while reducing unnecessary HTTP requests.

The streamed information includes:

- CPU utilization
- Memory usage
- Disk utilization
- Network activity
- Process statistics
- Top resource-consuming processes
- System information

### Live Communication Pipeline

```

Operating System

        │

        ▼

Monitoring Engine

        │

        ▼

Monitoring Collector

        │

        ▼

FastAPI WebSocket

        │

        ▼

LiveMonitorService

        │

        ▼

React Dashboard

```

---

# Analytics Engine

The Analytics Engine is responsible for transforming scheduler execution results into meaningful performance insights.

Following each scheduler execution, execution statistics are collected, normalized, and compared across all implemented scheduling algorithms.

The Analytics Engine computes:

- Waiting Time
- Turnaround Time
- Response Time
- Throughput
- CPU Utilization
- Scheduler Ranking

These metrics are visualized using interactive charts within the Scheduler Analysis dashboard, enabling direct comparison between scheduling strategies.

---

# Dashboard Visualization

The frontend dashboard provides a centralized interface for interacting with every subsystem of ACRO OS.

Visualization components include:

- Cluster overview
- Host resource cards
- Virtual machine information
- Live CPU monitoring
- Memory utilization
- Disk usage
- Network statistics
- Scheduler comparison charts
- Performance metrics
- Top running processes
- Scheduler recommendation
- Architecture documentation

All visualizations update dynamically using REST APIs and WebSocket streams.

---

# Report Generation

ACRO OS includes an integrated reporting subsystem capable of exporting scheduler execution results into PDF reports.

Generated reports summarize:

- Selected scheduling algorithm
- Workload configuration
- Simulation parameters
- Execution metrics
- Comparative scheduler analysis
- Performance statistics
- Resource utilization summary

This functionality enables simulation results to be archived, shared, and analysed outside the application.

---

# Design Principles

The architecture of ACRO OS follows several software engineering principles to ensure maintainability and extensibility.

- Modular system design
- Separation of concerns
- Layered architecture
- Reusable frontend components
- Service-oriented backend architecture
- Event-driven real-time communication
- Configurable simulation workflows
- Independent scheduling modules
- Extensible monitoring framework
- Scalable analytics pipeline

These principles allow new scheduling algorithms, monitoring modules, visualization components, and cloud simulation features to be integrated without restructuring the overall application architecture.

![Python](https://img.shields.io/badge/Python-3.x-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green)
![React](https://img.shields.io/badge/React-Frontend-61DAFB)
![WebSockets](https://img.shields.io/badge/WebSockets-RealTime-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)
