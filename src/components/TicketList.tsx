import React, { useState } from 'react';
import { Search, Filter, AlertTriangle, Clock, CheckCircle, Eye, Bell, ArrowUp, MessageCircle, X, Send } from 'lucide-react';

const TicketList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [alerts, setAlerts] = useState<{[key: string]: boolean}>({});
  const [escalations, setEscalations] = useState<{[key: string]: boolean}>({});
  const [comments, setComments] = useState<{[key: string]: string[]}>({});
  const [activeCommentModal, setActiveCommentModal] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');

  const tickets = [
    {
      id: '#2456',
      title: 'Database connectivity issues causing application timeouts',
      description: 'Users unable to access customer portal due to database connection failures',
      priority: 'High',
      status: 'In Progress',
      risk: 'high',
      riskScore: 85,
      assignee: 'Sarah Johnson',
      created: '2025-01-15 09:30',
      slaDeadline: '2025-01-15 13:30',
      category: 'Infrastructure'
    },
    {
      id: '#2455',
      title: 'Email server configuration update required',
      description: 'SMTP configuration needs updating for new security protocols',
      priority: 'Medium',
      status: 'Open',
      risk: 'medium',
      riskScore: 62,
      assignee: 'Mike Chen',
      created: '2025-01-15 08:45',
      slaDeadline: '2025-01-16 08:45',
      category: 'Infrastructure'
    },
    {
      id: '#2454',
      title: 'User account access request for new employee',
      description: 'New hire needs access to CRM and project management tools',
      priority: 'Low',
      status: 'Resolved',
      risk: 'low',
      riskScore: 15,
      assignee: 'Lisa Park',
      created: '2025-01-14 14:20',
      slaDeadline: '2025-01-17 14:20',
      category: 'User Access'
    },
    {
      id: '#2453',
      title: 'Application deployment failure in production environment',
      description: 'Latest release failed to deploy causing service interruption',
      priority: 'High',
      status: 'In Progress',
      risk: 'high',
      riskScore: 92,
      assignee: 'David Kim',
      created: '2025-01-15 11:15',
      slaDeadline: '2025-01-15 15:15',
      category: 'Application'
    },
    {
      id: '#2452',
      title: 'Network latency optimization for remote offices',
      description: 'Users experiencing slow response times from main applications',
      priority: 'Medium',
      status: 'Open',
      risk: 'medium',
      riskScore: 48,
      assignee: 'Emma Wilson',
      created: '2025-01-15 07:30',
      slaDeadline: '2025-01-16 07:30',
      category: 'Network'
    },
    {
      id: '#2451',
      title: 'Security certificate renewal for web applications',
      description: 'SSL certificates expiring soon, need immediate renewal',
      priority: 'High',
      status: 'Open',
      risk: 'high',
      riskScore: 78,
      assignee: 'Unassigned',
      created: '2025-01-15 06:00',
      slaDeadline: '2025-01-15 18:00',
      category: 'Security'
    }
    ,
    {
      id: '#2450',
      title: 'Backup system maintenance and verification required',
      description: 'Weekly backup verification failed, need to investigate and fix backup processes',
      priority: 'Medium',
      status: 'Open',
      risk: 'medium',
      riskScore: 55,
      assignee: 'Jennifer Lee',
      created: '2025-01-14 16:45',
      slaDeadline: '2025-01-16 16:45',
      category: 'Infrastructure'
    },
    {
      id: '#2449',
      title: 'Mobile app crashes on iOS devices after latest update',
      description: 'Users reporting frequent crashes when accessing customer data on iOS mobile app',
      priority: 'High',
      status: 'In Progress',
      risk: 'high',
      riskScore: 88,
      assignee: 'Alex Rodriguez',
      created: '2025-01-14 13:20',
      slaDeadline: '2025-01-14 17:20',
      category: 'Application'
    },
    {
      id: '#2448',
      title: 'VPN connection issues for remote employees',
      description: 'Multiple users unable to establish VPN connections from home offices',
      priority: 'Medium',
      status: 'Open',
      risk: 'medium',
      riskScore: 67,
      assignee: 'Tom Wilson',
      created: '2025-01-14 10:30',
      slaDeadline: '2025-01-15 10:30',
      category: 'Network'
    },
    {
      id: '#2447',
      title: 'Printer driver installation for new workstations',
      description: 'Need to install and configure printer drivers for 15 new workstations',
      priority: 'Low',
      status: 'Resolved',
      risk: 'low',
      riskScore: 12,
      assignee: 'Maria Garcia',
      created: '2025-01-13 14:15',
      slaDeadline: '2025-01-16 14:15',
      category: 'Hardware'
    },
    {
      id: '#2446',
      title: 'Database performance optimization needed',
      description: 'Query response times have increased significantly, need performance tuning',
      priority: 'High',
      status: 'In Progress',
      risk: 'high',
      riskScore: 82,
      assignee: 'Robert Chang',
      created: '2025-01-13 11:45',
      slaDeadline: '2025-01-13 23:45',
      category: 'Infrastructure'
    },
    {
      id: '#2445',
      title: 'Software license renewal for design team',
      description: 'Adobe Creative Suite licenses expiring next week, need immediate renewal',
      priority: 'Medium',
      status: 'Open',
      risk: 'medium',
      riskScore: 58,
      assignee: 'Unassigned',
      created: '2025-01-13 09:00',
      slaDeadline: '2025-01-15 09:00',
      category: 'Software'
    },
    {
      id: '#2444',
      title: 'Firewall rule configuration for new application',
      description: 'Configure firewall rules to allow traffic for newly deployed web application',
      priority: 'Medium',
      status: 'Resolved',
      risk: 'low',
      riskScore: 25,
      assignee: 'Kevin Park',
      created: '2025-01-12 15:30',
      slaDeadline: '2025-01-14 15:30',
      category: 'Security'
    },
    {
      id: '#2443',
      title: 'Email attachment size limit increase request',
      description: 'Marketing team needs increased email attachment limits for campaign materials',
      priority: 'Low',
      status: 'Open',
      risk: 'low',
      riskScore: 18,
      assignee: 'Sophie Turner',
      created: '2025-01-12 12:20',
      slaDeadline: '2025-01-15 12:20',
      category: 'Infrastructure'
    },
    {
      id: '#2442',
      title: 'Server disk space cleanup and optimization',
      description: 'Production servers running low on disk space, need cleanup and optimization',
      priority: 'High',
      status: 'In Progress',
      risk: 'high',
      riskScore: 75,
      assignee: 'Daniel Kim',
      created: '2025-01-12 08:15',
      slaDeadline: '2025-01-12 20:15',
      category: 'Infrastructure'
    },
    {
      id: '#2441',
      title: 'Multi-factor authentication setup for executives',
      description: 'Configure MFA for C-level executives as per new security policy',
      priority: 'Medium',
      status: 'Resolved',
      risk: 'low',
      riskScore: 22,
      assignee: 'Rachel Adams',
      created: '2025-01-11 16:40',
      slaDeadline: '2025-01-13 16:40',
      category: 'Security'
    },
    {
      id: '#2440',
      title: 'Conference room AV equipment troubleshooting',
      description: 'Projector and audio system not working in main conference room',
      priority: 'Medium',
      status: 'Open',
      risk: 'medium',
      riskScore: 45,
      assignee: 'Chris Johnson',
      created: '2025-01-11 13:25',
      slaDeadline: '2025-01-12 13:25',
      category: 'Hardware'
    },
    {
      id: '#2439',
      title: 'API rate limiting implementation for external services',
      description: 'Implement rate limiting to prevent API abuse from external integrations',
      priority: 'Medium',
      status: 'In Progress',
      risk: 'medium',
      riskScore: 52,
      assignee: 'Nina Patel',
      created: '2025-01-11 10:10',
      slaDeadline: '2025-01-13 10:10',
      category: 'Application'
    },
    {
      id: '#2438',
      title: 'Wireless network password reset for guest network',
      description: 'Reset and update guest WiFi password for security compliance',
      priority: 'Low',
      status: 'Resolved',
      risk: 'low',
      riskScore: 8,
      assignee: 'Mark Thompson',
      created: '2025-01-10 14:50',
      slaDeadline: '2025-01-12 14:50',
      category: 'Network'
    },
    {
      id: '#2437',
      title: 'Data migration from legacy CRM system',
      description: 'Migrate customer data from old CRM to new system before decommission',
      priority: 'High',
      status: 'Open',
      risk: 'high',
      riskScore: 89,
      assignee: 'Unassigned',
      created: '2025-01-10 11:30',
      slaDeadline: '2025-01-11 11:30',
      category: 'Application'
    },
    {
      id: '#2436',
      title: 'Antivirus software update deployment',
      description: 'Deploy latest antivirus definitions and software updates across all workstations',
      priority: 'Medium',
      status: 'In Progress',
      risk: 'medium',
      riskScore: 38,
      assignee: 'Laura Martinez',
      created: '2025-01-10 09:15',
      slaDeadline: '2025-01-12 09:15',
      category: 'Security'
    }
    ,
    {
      id: '#2435',
      title: 'Cloud storage quota increase for marketing team',
      description: 'Marketing team has exceeded cloud storage limits, need quota increase',
      priority: 'Medium',
      status: 'Open',
      risk: 'medium',
      riskScore: 42,
      assignee: 'James Wilson',
      created: '2025-01-09 15:30',
      slaDeadline: '2025-01-11 15:30',
      category: 'Infrastructure'
    },
    {
      id: '#2434',
      title: 'Password reset for locked user accounts',
      description: 'Multiple users locked out after failed login attempts, need password reset',
      priority: 'High',
      status: 'In Progress',
      risk: 'high',
      riskScore: 73,
      assignee: 'Anna Rodriguez',
      created: '2025-01-09 12:45',
      slaDeadline: '2025-01-09 16:45',
      category: 'User Access'
    },
    {
      id: '#2433',
      title: 'Software installation on new workstations',
      description: 'Install standard software package on 20 new employee workstations',
      priority: 'Low',
      status: 'Open',
      risk: 'low',
      riskScore: 28,
      assignee: 'Peter Chang',
      created: '2025-01-09 10:20',
      slaDeadline: '2025-01-12 10:20',
      category: 'Software'
    },
    {
      id: '#2432',
      title: 'Network switch replacement in server room',
      description: 'Primary network switch showing hardware failures, needs immediate replacement',
      priority: 'High',
      status: 'In Progress',
      risk: 'high',
      riskScore: 91,
      assignee: 'Michael Torres',
      created: '2025-01-09 08:00',
      slaDeadline: '2025-01-09 20:00',
      category: 'Network'
    },
    {
      id: '#2431',
      title: 'Email distribution list creation for new project',
      description: 'Create email distribution lists for Project Phoenix team members',
      priority: 'Low',
      status: 'Resolved',
      risk: 'low',
      riskScore: 5,
      assignee: 'Sarah Kim',
      created: '2025-01-08 16:15',
      slaDeadline: '2025-01-10 16:15',
      category: 'Infrastructure'
    },
    {
      id: '#2430',
      title: 'Database backup verification failure',
      description: 'Automated backup verification failed for customer database',
      priority: 'High',
      status: 'Open',
      risk: 'high',
      riskScore: 86,
      assignee: 'Unassigned',
      created: '2025-01-08 14:30',
      slaDeadline: '2025-01-08 22:30',
      category: 'Infrastructure'
    },
    {
      id: '#2429',
      title: 'Mobile device management enrollment',
      description: 'Enroll 15 new company phones in mobile device management system',
      priority: 'Medium',
      status: 'In Progress',
      risk: 'medium',
      riskScore: 35,
      assignee: 'Lisa Chen',
      created: '2025-01-08 11:45',
      slaDeadline: '2025-01-10 11:45',
      category: 'Security'
    },
    {
      id: '#2428',
      title: 'Web application SSL certificate installation',
      description: 'Install new SSL certificates for customer portal and admin interface',
      priority: 'High',
      status: 'Resolved',
      risk: 'low',
      riskScore: 19,
      assignee: 'David Park',
      created: '2025-01-07 13:20',
      slaDeadline: '2025-01-08 13:20',
      category: 'Security'
    },
    {
      id: '#2427',
      title: 'Printer maintenance and toner replacement',
      description: 'Quarterly maintenance for all office printers and toner replacement',
      priority: 'Low',
      status: 'Open',
      risk: 'low',
      riskScore: 14,
      assignee: 'Carlos Martinez',
      created: '2025-01-07 09:30',
      slaDeadline: '2025-01-10 09:30',
      category: 'Hardware'
    },
    {
      id: '#2426',
      title: 'API gateway performance optimization',
      description: 'API response times degraded, need performance tuning and optimization',
      priority: 'High',
      status: 'In Progress',
      risk: 'high',
      riskScore: 79,
      assignee: 'Jennifer Wu',
      created: '2025-01-07 07:15',
      slaDeadline: '2025-01-07 19:15',
      category: 'Application'
    },
    {
      id: '#2425',
      title: 'User training session for new CRM system',
      description: 'Conduct training sessions for sales team on new CRM features',
      priority: 'Medium',
      status: 'Open',
      risk: 'medium',
      riskScore: 31,
      assignee: 'Robert Johnson',
      created: '2025-01-06 14:45',
      slaDeadline: '2025-01-09 14:45',
      category: 'User Access'
    },
    {
      id: '#2424',
      title: 'Server room temperature monitoring system repair',
      description: 'Temperature monitoring alerts not working, need immediate repair',
      priority: 'High',
      status: 'Open',
      risk: 'high',
      riskScore: 84,
      assignee: 'Unassigned',
      created: '2025-01-06 11:30',
      slaDeadline: '2025-01-06 23:30',
      category: 'Infrastructure'
    },
    {
      id: '#2423',
      title: 'Software license audit and compliance check',
      description: 'Annual software license audit to ensure compliance with vendor agreements',
      priority: 'Medium',
      status: 'In Progress',
      risk: 'medium',
      riskScore: 47,
      assignee: 'Michelle Lee',
      created: '2025-01-06 08:20',
      slaDeadline: '2025-01-08 08:20',
      category: 'Software'
    },
    {
      id: '#2422',
      title: 'Network firewall rule update for new application',
      description: 'Configure firewall rules for newly deployed inventory management system',
      priority: 'Medium',
      status: 'Resolved',
      risk: 'low',
      riskScore: 23,
      assignee: 'Kevin Zhang',
      created: '2025-01-05 15:10',
      slaDeadline: '2025-01-07 15:10',
      category: 'Security'
    },
    {
      id: '#2421',
      title: 'Email archiving system maintenance',
      description: 'Perform maintenance on email archiving system and verify data integrity',
      priority: 'Low',
      status: 'Open',
      risk: 'low',
      riskScore: 16,
      assignee: 'Amanda Taylor',
      created: '2025-01-05 12:30',
      slaDeadline: '2025-01-08 12:30',
      category: 'Infrastructure'
    },
    {
      id: '#2420',
      title: 'Database connection pool optimization',
      description: 'Optimize database connection pooling to improve application performance',
      priority: 'High',
      status: 'In Progress',
      risk: 'high',
      riskScore: 77,
      assignee: 'Steven Kim',
      created: '2025-01-05 09:45',
      slaDeadline: '2025-01-05 21:45',
      category: 'Infrastructure'
    },
    {
      id: '#2419',
      title: 'Workstation hardware upgrade for design team',
      description: 'Upgrade RAM and graphics cards for 8 design team workstations',
      priority: 'Medium',
      status: 'Open',
      risk: 'medium',
      riskScore: 39,
      assignee: 'Brian Wilson',
      created: '2025-01-04 16:20',
      slaDeadline: '2025-01-07 16:20',
      category: 'Hardware'
    },
    {
      id: '#2418',
      title: 'Cloud backup service configuration',
      description: 'Configure automated cloud backup for critical business documents',
      priority: 'High',
      status: 'Resolved',
      risk: 'low',
      riskScore: 21,
      assignee: 'Nancy Rodriguez',
      created: '2025-01-04 13:15',
      slaDeadline: '2025-01-05 13:15',
      category: 'Infrastructure'
    },
    {
      id: '#2417',
      title: 'VoIP phone system troubleshooting',
      description: 'Multiple users reporting call quality issues and dropped calls',
      priority: 'High',
      status: 'In Progress',
      risk: 'high',
      riskScore: 81,
      assignee: 'Thomas Anderson',
      created: '2025-01-04 10:30',
      slaDeadline: '2025-01-04 22:30',
      category: 'Network'
    },
    {
      id: '#2416',
      title: 'Security awareness training material update',
      description: 'Update security training materials with latest threat information',
      priority: 'Low',
      status: 'Open',
      risk: 'low',
      riskScore: 11,
      assignee: 'Patricia Davis',
      created: '2025-01-04 07:45',
      slaDeadline: '2025-01-07 07:45',
      category: 'Security'
    },
    {
      id: '#2415',
      title: 'Application server memory leak investigation',
      description: 'Application server consuming excessive memory, investigate and fix leak',
      priority: 'High',
      status: 'Open',
      risk: 'high',
      riskScore: 88,
      assignee: 'Unassigned',
      created: '2025-01-03 14:20',
      slaDeadline: '2025-01-04 02:20',
      category: 'Application'
    },
    {
      id: '#2414',
      title: 'Network cable management in office areas',
      description: 'Organize and secure network cables in open office areas for safety',
      priority: 'Low',
      status: 'In Progress',
      risk: 'low',
      riskScore: 7,
      assignee: 'Mark Thompson',
      created: '2025-01-03 11:10',
      slaDeadline: '2025-01-06 11:10',
      category: 'Network'
    },
    {
      id: '#2413',
      title: 'Customer portal login issues troubleshooting',
      description: 'Customers unable to log into portal, authentication service problems',
      priority: 'High',
      status: 'Resolved',
      risk: 'low',
      riskScore: 17,
      assignee: 'Jessica Brown',
      created: '2025-01-03 08:30',
      slaDeadline: '2025-01-03 20:30',
      category: 'Application'
    },
    {
      id: '#2412',
      title: 'Inventory management system data import',
      description: 'Import legacy inventory data into new management system',
      priority: 'Medium',
      status: 'Open',
      risk: 'medium',
      riskScore: 54,
      assignee: 'Ryan Garcia',
      created: '2025-01-02 15:45',
      slaDeadline: '2025-01-04 15:45',
      category: 'Application'
    },
    {
      id: '#2411',
      title: 'Wireless access point replacement in conference rooms',
      description: 'Replace failing wireless access points in all conference rooms',
      priority: 'Medium',
      status: 'In Progress',
      risk: 'medium',
      riskScore: 43,
      assignee: 'Catherine Liu',
      created: '2025-01-02 12:20',
      slaDeadline: '2025-01-04 12:20',
      category: 'Network'
    },
    {
      id: '#2410',
      title: 'Employee onboarding IT checklist automation',
      description: 'Automate IT setup checklist for new employee onboarding process',
      priority: 'Low',
      status: 'Open',
      risk: 'low',
      riskScore: 26,
      assignee: 'Jonathan Miller',
      created: '2025-01-02 09:15',
      slaDeadline: '2025-01-05 09:15',
      category: 'User Access'
    },
    {
      id: '#2409',
      title: 'Server virtualization platform upgrade',
      description: 'Upgrade VMware infrastructure to latest version for security patches',
      priority: 'High',
      status: 'Open',
      risk: 'high',
      riskScore: 76,
      assignee: 'Unassigned',
      created: '2025-01-01 16:30',
      slaDeadline: '2025-01-02 04:30',
      category: 'Infrastructure'
    },
    {
      id: '#2408',
      title: 'Document management system user permissions',
      description: 'Configure user permissions for new document management system',
      priority: 'Medium',
      status: 'Resolved',
      risk: 'low',
      riskScore: 29,
      assignee: 'Stephanie Wong',
      created: '2025-01-01 13:45',
      slaDeadline: '2025-01-03 13:45',
      category: 'User Access'
    },
    {
      id: '#2407',
      title: 'Network monitoring system alert configuration',
      description: 'Configure monitoring alerts for network devices and bandwidth usage',
      priority: 'Medium',
      status: 'In Progress',
      risk: 'medium',
      riskScore: 36,
      assignee: 'Gregory Adams',
      created: '2024-12-31 10:20',
      slaDeadline: '2025-01-02 10:20',
      category: 'Network'
    },
    {
      id: '#2406',
      title: 'Backup tape drive replacement',
      description: 'Replace failing backup tape drive in data center',
      priority: 'High',
      status: 'Open',
      risk: 'high',
      riskScore: 83,
      assignee: 'Unassigned',
      created: '2024-12-31 07:15',
      slaDeadline: '2024-12-31 19:15',
      category: 'Hardware'
    },
    {
      id: '#2405',
      title: 'Software deployment automation script',
      description: 'Create automated deployment scripts for application updates',
      priority: 'Low',
      status: 'Open',
      risk: 'low',
      riskScore: 33,
      assignee: 'Eric Johnson',
      created: '2024-12-30 14:30',
      slaDeadline: '2025-01-02 14:30',
      category: 'Application'
    },
    {
      id: '#2404',
      title: 'Email server disk space cleanup',
      description: 'Clean up email server storage and archive old messages',
      priority: 'Medium',
      status: 'Resolved',
      risk: 'low',
      riskScore: 20,
      assignee: 'Helen Chang',
      created: '2024-12-30 11:45',
      slaDeadline: '2025-01-01 11:45',
      category: 'Infrastructure'
    },
    {
      id: '#2403',
      title: 'Remote desktop service configuration',
      description: 'Configure remote desktop access for traveling executives',
      priority: 'Medium',
      status: 'In Progress',
      risk: 'medium',
      riskScore: 41,
      assignee: 'William Davis',
      created: '2024-12-30 08:20',
      slaDeadline: '2025-01-01 08:20',
      category: 'User Access'
    },
    {
      id: '#2402',
      title: 'Database index optimization for reporting',
      description: 'Optimize database indexes to improve reporting query performance',
      priority: 'High',
      status: 'Open',
      risk: 'high',
      riskScore: 72,
      assignee: 'Unassigned',
      created: '2024-12-29 15:10',
      slaDeadline: '2024-12-30 03:10',
      category: 'Infrastructure'
    },
    {
      id: '#2401',
      title: 'Security camera system maintenance',
      description: 'Perform quarterly maintenance on office security camera system',
      priority: 'Low',
      status: 'Open',
      risk: 'low',
      riskScore: 9,
      assignee: 'Sandra Martinez',
      created: '2024-12-29 12:30',
      slaDeadline: '2025-01-01 12:30',
      category: 'Security'
    },
    {
      id: '#2400',
      title: 'Web application load balancer configuration',
      description: 'Configure load balancer for high availability web application deployment',
      priority: 'High',
      status: 'Resolved',
      risk: 'low',
      riskScore: 24,
      assignee: 'Andrew Kim',
      created: '2024-12-29 09:45',
      slaDeadline: '2024-12-29 21:45',
      category: 'Application'
    },
    {
      id: '#2399',
      title: 'Office network switch port configuration',
      description: 'Configure network switch ports for new office layout',
      priority: 'Medium',
      status: 'In Progress',
      risk: 'medium',
      riskScore: 37,
      assignee: 'Michelle Torres',
      created: '2024-12-28 16:15',
      slaDeadline: '2024-12-30 16:15',
      category: 'Network'
    },
    {
      id: '#2398',
      title: 'User account cleanup and deactivation',
      description: 'Deactivate accounts for terminated employees and clean up permissions',
      priority: 'Medium',
      status: 'Open',
      risk: 'medium',
      riskScore: 49,
      assignee: 'Christopher Lee',
      created: '2024-12-28 13:20',
      slaDeadline: '2024-12-30 13:20',
      category: 'User Access'
    },
    {
      id: '#2397',
      title: 'Application performance monitoring setup',
      description: 'Install and configure APM tools for critical business applications',
      priority: 'High',
      status: 'Open',
      risk: 'high',
      riskScore: 80,
      assignee: 'Unassigned',
      created: '2024-12-28 10:30',
      slaDeadline: '2024-12-28 22:30',
      category: 'Application'
    },
    {
      id: '#2396',
      title: 'Printer driver update for Windows 11 compatibility',
      description: 'Update printer drivers across all workstations for Windows 11 compatibility',
      priority: 'Low',
      status: 'Resolved',
      risk: 'low',
      riskScore: 13,
      assignee: 'Diana Wilson',
      created: '2024-12-27 14:45',
      slaDeadline: '2024-12-29 14:45',
      category: 'Hardware'
    },
    {
      id: '#2395',
      title: 'Cloud storage synchronization issues',
      description: 'Users experiencing sync issues with cloud storage service',
      priority: 'Medium',
      status: 'In Progress',
      risk: 'medium',
      riskScore: 56,
      assignee: 'Joseph Garcia',
      created: '2024-12-27 11:20',
      slaDeadline: '2024-12-29 11:20',
      category: 'Infrastructure'
    },
    {
      id: '#2394',
      title: 'Network security audit and vulnerability scan',
      description: 'Conduct comprehensive security audit and vulnerability assessment',
      priority: 'High',
      status: 'Open',
      risk: 'high',
      riskScore: 74,
      assignee: 'Unassigned',
      created: '2024-12-27 08:15',
      slaDeadline: '2024-12-27 20:15',
      category: 'Security'
    },
    {
      id: '#2393',
      title: 'Database replication setup for disaster recovery',
      description: 'Configure database replication to secondary site for disaster recovery',
      priority: 'High',
      status: 'In Progress',
      risk: 'high',
      riskScore: 85,
      assignee: 'Margaret Brown',
      created: '2024-12-26 15:30',
      slaDeadline: '2024-12-27 03:30',
      category: 'Infrastructure'
    },
    {
      id: '#2392',
      title: 'Mobile app push notification configuration',
      description: 'Configure push notifications for company mobile application',
      priority: 'Medium',
      status: 'Open',
      risk: 'medium',
      riskScore: 44,
      assignee: 'Richard Taylor',
      created: '2024-12-26 12:45',
      slaDeadline: '2024-12-28 12:45',
      category: 'Application'
    },
    {
      id: '#2391',
      title: 'Office Wi-Fi network optimization',
      description: 'Optimize Wi-Fi coverage and performance in office building',
      priority: 'Medium',
      status: 'Resolved',
      risk: 'low',
      riskScore: 27,
      assignee: 'Karen Anderson',
      created: '2024-12-26 09:10',
      slaDeadline: '2024-12-28 09:10',
      category: 'Network'
    },
    {
      id: '#2390',
      title: 'Software license compliance verification',
      description: 'Verify software license compliance across all departments',
      priority: 'Low',
      status: 'Open',
      risk: 'low',
      riskScore: 18,
      assignee: 'Paul Martinez',
      created: '2024-12-25 16:20',
      slaDeadline: '2024-12-28 16:20',
      category: 'Software'
    },
    {
      id: '#2389',
      title: 'Server room UPS battery replacement',
      description: 'Replace UPS batteries in server room before they fail',
      priority: 'High',
      status: 'Open',
      risk: 'high',
      riskScore: 87,
      assignee: 'Unassigned',
      created: '2024-12-25 13:15',
      slaDeadline: '2024-12-26 01:15',
      category: 'Hardware'
    },
    {
      id: '#2388',
      title: 'Email encryption setup for legal department',
      description: 'Configure email encryption for sensitive legal communications',
      priority: 'High',
      status: 'In Progress',
      risk: 'high',
      riskScore: 71,
      assignee: 'Linda Rodriguez',
      created: '2024-12-25 10:30',
      slaDeadline: '2024-12-25 22:30',
      category: 'Security'
    },
    {
      id: '#2387',
      title: 'Customer database performance tuning',
      description: 'Optimize customer database queries for better application performance',
      priority: 'High',
      status: 'Resolved',
      risk: 'low',
      riskScore: 22,
      assignee: 'Charles Wilson',
      created: '2024-12-24 14:45',
      slaDeadline: '2024-12-25 02:45',
      category: 'Infrastructure'
    },
    {
      id: '#2386',
      title: 'Video conferencing system upgrade',
      description: 'Upgrade video conferencing software and hardware in meeting rooms',
      priority: 'Medium',
      status: 'Open',
      risk: 'medium',
      riskScore: 40,
      assignee: 'Betty Davis',
      created: '2024-12-24 11:20',
      slaDeadline: '2024-12-26 11:20',
      category: 'Hardware'
    },
    {
      id: '#2385',
      title: 'Web application security headers implementation',
      description: 'Implement security headers for all web applications',
      priority: 'Medium',
      status: 'In Progress',
      risk: 'medium',
      riskScore: 51,
      assignee: 'Donald Kim',
      created: '2024-12-24 08:35',
      slaDeadline: '2024-12-26 08:35',
      category: 'Security'
    },
    {
      id: '#2384',
      title: 'Network bandwidth monitoring and reporting',
      description: 'Set up bandwidth monitoring and generate usage reports',
      priority: 'Low',
      status: 'Open',
      risk: 'low',
      riskScore: 30,
      assignee: 'Susan Garcia',
      created: '2024-12-23 15:50',
      slaDeadline: '2024-12-26 15:50',
      category: 'Network'
    },
    {
      id: '#2383',
      title: 'Application log rotation and archival',
      description: 'Configure log rotation and archival for all application servers',
      priority: 'Low',
      status: 'Resolved',
      risk: 'low',
      riskScore: 10,
      assignee: 'George Martinez',
      created: '2024-12-23 12:15',
      slaDeadline: '2024-12-25 12:15',
      category: 'Application'
    },
    {
      id: '#2382',
      title: 'Workstation antivirus policy enforcement',
      description: 'Enforce antivirus policies on all workstations and resolve violations',
      priority: 'Medium',
      status: 'In Progress',
      risk: 'medium',
      riskScore: 46,
      assignee: 'Dorothy Johnson',
      created: '2024-12-23 09:40',
      slaDeadline: '2024-12-25 09:40',
      category: 'Security'
    },
    {
      id: '#2381',
      title: 'Cloud infrastructure cost optimization',
      description: 'Analyze and optimize cloud infrastructure costs and resource usage',
      priority: 'Medium',
      status: 'Open',
      risk: 'medium',
      riskScore: 38,
      assignee: 'Kenneth Brown',
      created: '2024-12-22 16:25',
      slaDeadline: '2024-12-24 16:25',
      category: 'Infrastructure'
    },
    {
      id: '#2380',
      title: 'User access review and audit',
      description: 'Conduct quarterly user access review and remove unnecessary permissions',
      priority: 'Medium',
      status: 'Open',
      risk: 'medium',
      riskScore: 53,
      assignee: 'Lisa Anderson',
      created: '2024-12-22 13:10',
      slaDeadline: '2024-12-24 13:10',
      category: 'User Access'
    },
    {
      id: '#2379',
      title: 'Network equipment firmware updates',
      description: 'Update firmware on all network switches and routers',
      priority: 'High',
      status: 'Resolved',
      risk: 'low',
      riskScore: 25,
      assignee: 'Edward Wilson',
      created: '2024-12-22 10:30',
      slaDeadline: '2024-12-22 22:30',
      category: 'Network'
    },
    {
      id: '#2378',
      title: 'Database connection timeout optimization',
      description: 'Optimize database connection timeouts to reduce application errors',
      priority: 'High',
      status: 'In Progress',
      risk: 'high',
      riskScore: 78,
      assignee: 'Helen Taylor',
      created: '2024-12-21 14:15',
      slaDeadline: '2024-12-22 02:15',
      category: 'Infrastructure'
    },
    {
      id: '#2377',
      title: 'Mobile device security policy implementation',
      description: 'Implement new mobile device security policies across organization',
      priority: 'Medium',
      status: 'Open',
      risk: 'medium',
      riskScore: 45,
      assignee: 'Frank Garcia',
      created: '2024-12-21 11:45',
      slaDeadline: '2024-12-23 11:45',
      category: 'Security'
    },
    {
      id: '#2376',
      title: 'Application server clustering configuration',
      description: 'Configure application server clustering for high availability',
      priority: 'High',
      status: 'Open',
      risk: 'high',
      riskScore: 82,
      assignee: 'Unassigned',
      created: '2024-12-21 08:20',
      slaDeadline: '2024-12-21 20:20',
      category: 'Application'
    },
    {
      id: '#2375',
      title: 'Office printer network configuration',
      description: 'Configure network settings for new office printers',
      priority: 'Low',
      status: 'Resolved',
      risk: 'low',
      riskScore: 6,
      assignee: 'Ruth Martinez',
      created: '2024-12-20 15:30',
      slaDeadline: '2024-12-22 15:30',
      category: 'Hardware'
    },
    {
      id: '#2374',
      title: 'Web application session management optimization',
      description: 'Optimize session management for better web application performance',
      priority: 'Medium',
      status: 'In Progress',
      risk: 'medium',
      riskScore: 48,
      assignee: 'Raymond Johnson',
      created: '2024-12-20 12:45',
      slaDeadline: '2024-12-22 12:45',
      category: 'Application'
    },
    {
      id: '#2373',
      title: 'Network intrusion detection system tuning',
      description: 'Fine-tune IDS rules to reduce false positives and improve detection',
      priority: 'High',
      status: 'Open',
      risk: 'high',
      riskScore: 75,
      assignee: 'Unassigned',
      created: '2024-12-20 09:15',
      slaDeadline: '2024-12-20 21:15',
      category: 'Security'
    },
    {
      id: '#2372',
      title: 'Server virtualization resource allocation',
      description: 'Optimize virtual machine resource allocation on hypervisor hosts',
      priority: 'Medium',
      status: 'Open',
      risk: 'medium',
      riskScore: 50,
      assignee: 'Carol Davis',
      created: '2024-12-19 16:40',
      slaDeadline: '2024-12-21 16:40',
      category: 'Infrastructure'
    },
    {
      id: '#2371',
      title: 'Email spam filter configuration update',
      description: 'Update spam filter rules to improve email security and reduce false positives',
      priority: 'Medium',
      status: 'Resolved',
      risk: 'low',
      riskScore: 32,
      assignee: 'Anthony Brown',
      created: '2024-12-19 13:25',
      slaDeadline: '2024-12-21 13:25',
      category: 'Infrastructure'
    },
    {
      id: '#2370',
      title: 'User workstation performance optimization',
      description: 'Optimize performance on slow user workstations and clean up temporary files',
      priority: 'Low',
      status: 'In Progress',
      risk: 'low',
      riskScore: 34,
      assignee: 'Mark Wilson',
      created: '2024-12-19 10:10',
      slaDeadline: '2024-12-22 10:10',
      category: 'Hardware'
    }
  ];

  const getStatusBadge = (status: string) => {
    const classes = {
      'Open': 'bg-blue-100 text-blue-800',
      'In Progress': 'bg-yellow-100 text-yellow-800',
      'Resolved': 'bg-green-100 text-green-800',
      'Closed': 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${classes[status as keyof typeof classes]}`}>
        {status}
      </span>
    );
  };

  const getRiskBadge = (risk: string, score: number) => {
    const classes = {
      high: 'bg-red-100 text-red-800 border-red-200',
      medium: 'bg-amber-100 text-amber-800 border-amber-200',
      low: 'bg-green-100 text-green-800 border-green-200'
    };
    
    return (
      <div className={`px-3 py-1 text-xs font-medium rounded-lg border ${classes[risk as keyof typeof classes]}`}>
        {score}% Risk
      </div>
    );
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'high':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'medium':
        return <Clock className="w-4 h-4 text-amber-500" />;
      default:
        return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'text-red-600';
      case 'Medium':
        return 'text-amber-600';
      default:
        return 'text-green-600';
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.assignee.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || ticket.status.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  const handleAlert = (ticketId: string) => {
    const isCurrentlyAlerted = alerts[ticketId];
    setAlerts(prev => ({
      ...prev,
      [ticketId]: !prev[ticketId]
    }));
    
    // Show a brief notification (you could integrate with a toast library)
    console.log(`Alert ${!isCurrentlyAlerted ? 'enabled' : 'disabled'} for ticket ${ticketId}`);
  };

  const handleEscalate = (ticketId: string) => {
    const isCurrentlyEscalated = escalations[ticketId];
    setEscalations(prev => ({
      ...prev,
      [ticketId]: !prev[ticketId]
    }));
    
    // Show a brief notification
    console.log(`Ticket ${ticketId} ${!isCurrentlyEscalated ? 'escalated' : 'de-escalated'}`);
  };

  const handleAddComment = (ticketId: string) => {
    if (newComment.trim()) {
      const timestamp = new Date().toLocaleString();
      const comment = `${newComment} - Added on ${timestamp}`;
      
      setComments(prev => ({
        ...prev,
        [ticketId]: [...(prev[ticketId] || []), comment]
      }));
      
      setNewComment('');
      setActiveCommentModal(null);
    }
  };

  const openCommentModal = (ticketId: string) => {
    setActiveCommentModal(ticketId);
    setNewComment('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Ticket Management</h2>
        <p className="text-gray-600 mt-1">Monitor all tickets with real-time SLA breach predictions</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tickets List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-200">
          {filteredTickets.map((ticket, index) => (
            <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getRiskIcon(ticket.risk)}
                    <span className="font-semibold text-gray-900">{ticket.id}</span>
                    {getStatusBadge(ticket.status)}
                    <span className={`text-sm font-medium ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority} Priority
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{ticket.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{ticket.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span>Assignee: <span className="font-medium">{ticket.assignee}</span></span>
                    <span>Category: <span className="font-medium">{ticket.category}</span></span>
                    <span>Created: <span className="font-medium">{ticket.created}</span></span>
                    <span>SLA Deadline: <span className="font-medium">{ticket.slaDeadline}</span></span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 ml-6">
                  {getRiskBadge(ticket.risk, ticket.riskScore)}
                  
                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2">
                    {/* Alert Button */}
                    <button
                      onClick={() => handleAlert(ticket.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        alerts[ticket.id]
                          ? 'text-red-600 bg-red-50 hover:bg-red-100'
                          : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                      }`}
                      title={alerts[ticket.id] ? 'Remove Alert - Click to disable notifications' : 'Set Alert - Click to enable notifications for this ticket'}
                    >
                      <Bell className="w-4 h-4" />
                    </button>

                    {/* Escalate Button */}
                    <button
                      onClick={() => handleEscalate(ticket.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        escalations[ticket.id]
                          ? 'text-orange-600 bg-orange-50 hover:bg-orange-100'
                          : 'text-gray-400 hover:text-orange-600 hover:bg-orange-50'
                      }`}
                      title={escalations[ticket.id] ? 'Ticket Escalated - Priority elevated to management' : 'Escalate Ticket - Elevate to higher priority'}
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>

                    {/* Comment Button */}
                    <button
                      onClick={() => openCommentModal(ticket.id)}
                      className="text-gray-400 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors relative"
                      title={`Add Comment - ${comments[ticket.id]?.length || 0} existing comments`}
                    >
                      <MessageCircle className="w-4 h-4" />
                      {comments[ticket.id] && comments[ticket.id].length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {comments[ticket.id].length}
                        </span>
                      )}
                    </button>

                    {/* View Button */}
                    <button className="text-gray-400 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors">
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Status Indicators */}
              {(alerts[ticket.id] || escalations[ticket.id] || (comments[ticket.id] && comments[ticket.id].length > 0)) && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {alerts[ticket.id] && (
                      <span className="inline-flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full border border-red-200">
                        <Bell className="w-3 h-3" />
                        <span>🔔 Alert Active</span>
                      </span>
                    )}
                    {escalations[ticket.id] && (
                      <span className="inline-flex items-center space-x-1 px-3 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full border border-orange-200">
                        <ArrowUp className="w-3 h-3" />
                        <span>⚡ Escalated</span>
                      </span>
                    )}
                    {comments[ticket.id] && comments[ticket.id].length > 0 && (
                      <span className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full border border-blue-200">
                        <MessageCircle className="w-3 h-3" />
                        <span>💬 {comments[ticket.id].length} Comment{comments[ticket.id].length !== 1 ? 's' : ''}</span>
                      </span>
                    )}
                  </div>
                  
                  {/* Show Comments */}
                  {comments[ticket.id] && comments[ticket.id].length > 0 && (
                    <div className="mt-3 space-y-2">
                      <h4 className="text-sm font-medium text-gray-700">Recent Comments:</h4>
                      {comments[ticket.id].slice(-2).map((comment, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700 border-l-4 border-blue-200">
                          {comment}
                        </div>
                      ))}
                      {comments[ticket.id].length > 2 && (
                        <button className="text-blue-600 hover:text-blue-700 text-xs font-medium hover:underline">
                          View all {comments[ticket.id].length} comments
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Comment Modal */}
      {activeCommentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Add Comment</h3>
                <p className="text-sm text-gray-500">Ticket {activeCommentModal}</p>
              </div>
              <button
                onClick={() => setActiveCommentModal(null)}
                className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              {comments[activeCommentModal] && comments[activeCommentModal].length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Previous Comments:</p>
                  <div className="max-h-32 overflow-y-auto space-y-2">
                    {comments[activeCommentModal].slice(-3).map((comment, idx) => (
                      <div key={idx} className="bg-gray-50 rounded p-2 text-xs text-gray-600">
                        {comment}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Enter your comment..."
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm"
              />
              <p className="text-xs text-gray-500 mt-2">
                Comments will be timestamped and visible to all team members.
              </p>
            </div>
            <div className="flex justify-end space-x-3 p-4 border-t border-gray-200">
              <button
                onClick={() => setActiveCommentModal(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAddComment(activeCommentModal)}
                disabled={!newComment.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors text-sm"
              >
                <Send className="w-4 h-4" />
                <span>Add Comment</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {filteredTickets.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
          <p className="text-gray-500">Try adjusting your search terms or filters.</p>
        </div>
      )}
    </div>
  );
};

export default TicketList;
