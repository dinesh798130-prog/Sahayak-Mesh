import { VenueResource } from './types';

export const INITIAL_VENUE_RESOURCES: VenueResource[] = [
  // 1. Campus Entrance & Gates
  {
    resourceId: 'res-gate-main',
    type: 'entrance',
    name: 'Main Campus Entrance Gate 1',
    buildingId: 'block-campus',
    buildingName: 'SNIST Main Campus Grounds',
    department: 'Security & Campus Control',
    roomNumber: 'GATE-01',
    zoneId: 'South Campus',
    floor: 'Ground Floor',
    accessible: true,
    x: 10,
    y: 90,
    gis: {
      lat: 17.45250,
      lng: 78.67510,
      placeId: 'ChIJ_snist_main_gate',
      formattedAddress: 'Main Entrance Gate 1, SNIST Campus, Yamnampet, Ghatkesar, Hyderabad, Telangana 501301',
      googlePlaceTypes: ['university', 'establishment', 'point_of_interest'],
      plusCode: '7J9W+22 Ghatkesar, Telangana'
    },
    metadata: {
      capacity: 500,
      description: 'Main campus vehicle & pedestrian entry turnstiles with wheelchair barrier-free gate',
      connectedNodes: ['res-admin-counter', 'res-bus-terminal', 'res-lib-issue']
    }
  },
  {
    resourceId: 'res-gate-north',
    type: 'entrance',
    name: 'North Emergency Gate 2',
    buildingId: 'block-campus',
    buildingName: 'SNIST Main Campus Grounds',
    department: 'Security & Emergency',
    roomNumber: 'GATE-02',
    zoneId: 'North Campus',
    floor: 'Ground Floor',
    accessible: true,
    x: 90,
    y: 10,
    gis: {
      lat: 17.45410,
      lng: 78.67670,
      placeId: 'ChIJ_snist_north_gate',
      formattedAddress: 'North Emergency Gate 2, SNIST Campus, Hyderabad 501301',
      googlePlaceTypes: ['emergency_access', 'point_of_interest']
    },
    metadata: {
      capacity: 200,
      description: 'Emergency ambulance & fire tender gate connecting North Engineering Blocks',
      connectedNodes: ['res-ece-office', 'res-mech-cad-lab']
    }
  },

  // 2. Academic & Administrative Block
  {
    resourceId: 'res-admin-counter',
    type: 'counter',
    name: 'Central Academic & Exam Branch Desk',
    buildingId: 'block-admin',
    buildingName: 'Administrative & Principal Block',
    department: 'Administration',
    roomNumber: 'ADM-001',
    zoneId: 'Central Admin Wing',
    floor: 'Ground Floor',
    accessible: true,
    x: 25,
    y: 65,
    gis: {
      lat: 17.45280,
      lng: 78.67530,
      placeId: 'ChIJ_snist_admin_desk',
      formattedAddress: 'Ground Floor, Administrative Block, SNIST Campus, Hyderabad',
      googlePlaceTypes: ['university', 'local_government_office', 'point_of_interest']
    },
    metadata: {
      capacity: 60,
      description: 'Student certificate issuing, fee payment counter, and priority accessibility desk',
      connectedNodes: ['res-gate-main', 'res-admin-auditorium', 'res-admin-lift']
    }
  },
  {
    resourceId: 'res-admin-auditorium',
    type: 'auditorium',
    name: 'Main Campus Grand Auditorium',
    buildingId: 'block-admin',
    buildingName: 'Administrative & Principal Block',
    department: 'Campus Cultural Wing',
    roomNumber: 'AUD-100',
    zoneId: 'Central Admin Wing',
    floor: '1st Floor',
    accessible: true,
    x: 30,
    y: 50,
    gis: {
      lat: 17.45285,
      lng: 78.67535,
      placeId: 'ChIJ_snist_auditorium',
      formattedAddress: '1st Floor Auditorium Hall, Admin Block, SNIST Campus',
      googlePlaceTypes: ['auditorium', 'event_venue']
    },
    metadata: {
      capacity: 1200,
      description: 'Air-conditioned 1200-seater main auditorium for seminars and national conferences',
      connectedNodes: ['res-admin-counter', 'res-admin-lift']
    }
  },
  {
    resourceId: 'res-admin-lift',
    type: 'lift',
    name: 'Admin Block Central Elevator',
    buildingId: 'block-admin',
    buildingName: 'Administrative & Principal Block',
    department: 'Administration',
    roomNumber: 'LIFT-ADM-01',
    zoneId: 'Central Admin Wing',
    floor: 'Ground Floor',
    accessible: true,
    x: 28,
    y: 58,
    gis: {
      lat: 17.45282,
      lng: 78.67532,
      placeId: 'ChIJ_admin_elevator_01',
      formattedAddress: 'Elevator Shaft A, Admin Block, SNIST Campus',
      googlePlaceTypes: ['elevator', 'transit_station']
    },
    metadata: {
      capacity: 16,
      description: 'Braille tactile button elevator serving Principal Office (1st Flr) and Management (2nd Flr)',
      connectedNodes: ['res-admin-counter', 'res-admin-auditorium']
    }
  },

  // 3. Computer Science & Engineering (CSE) / AI & DS Block
  {
    resourceId: 'res-cse-aiml-lab',
    type: 'lab',
    name: 'AI & Machine Learning Research Center',
    buildingId: 'block-cse',
    buildingName: 'CSE & AI/ML Engineering Block',
    department: 'AI & Data Science',
    roomNumber: 'CS-204',
    zoneId: 'CSE Technology Wing',
    floor: '2nd Floor',
    accessible: true,
    x: 50,
    y: 35,
    gis: {
      lat: 17.45320,
      lng: 78.67575,
      placeId: 'ChIJ_snist_aiml_lab',
      formattedAddress: '2nd Floor, CSE Engineering Block, SNIST Campus',
      googlePlaceTypes: ['research_institute', 'university']
    },
    metadata: {
      capacity: 75,
      description: 'NVIDIA GPU workstation lab for deep learning models and edge AI prototyping',
      connectedNodes: ['res-cse-computer-center', 'res-cse-hod-office', 'res-cse-lift']
    }
  },
  {
    resourceId: 'res-cse-computer-center',
    type: 'lab',
    name: 'Central Computer Center Labs 1-4',
    buildingId: 'block-cse',
    buildingName: 'CSE & AI/ML Engineering Block',
    department: 'CSE',
    roomNumber: 'CS-102',
    zoneId: 'CSE Technology Wing',
    floor: '1st Floor',
    accessible: true,
    x: 48,
    y: 40,
    gis: {
      lat: 17.45325,
      lng: 78.67578,
      placeId: 'ChIJ_snist_ccc_labs',
      formattedAddress: '1st Floor Computer Center, CSE Block, SNIST Campus',
      googlePlaceTypes: ['computer_lab', 'university']
    },
    metadata: {
      capacity: 200,
      description: 'High-speed gigabit LAN computer labs for programming practicals and online exams',
      connectedNodes: ['res-cse-aiml-lab', 'res-cse-hod-office', 'res-cse-lift']
    }
  },
  {
    resourceId: 'res-cse-hod-office',
    type: 'office',
    name: 'Department of CSE - HOD Cabin',
    buildingId: 'block-cse',
    buildingName: 'CSE & AI/ML Engineering Block',
    department: 'CSE',
    roomNumber: 'CS-101',
    zoneId: 'CSE Technology Wing',
    floor: '1st Floor',
    accessible: true,
    x: 52,
    y: 42,
    gis: {
      lat: 17.45330,
      lng: 78.67580,
      placeId: 'ChIJ_snist_cse_hod',
      formattedAddress: 'Room CS-101, 1st Floor, CSE Block, SNIST Campus',
      googlePlaceTypes: ['office', 'point_of_interest']
    },
    metadata: {
      capacity: 15,
      description: 'Head of Department office and faculty student counselling lounge',
      connectedNodes: ['res-cse-computer-center', 'res-cse-lift']
    }
  },
  {
    resourceId: 'res-cse-lift',
    type: 'lift',
    name: 'CSE Block Accessible Elevator',
    buildingId: 'block-cse',
    buildingName: 'CSE & AI/ML Engineering Block',
    department: 'CSE',
    roomNumber: 'LIFT-CS-01',
    zoneId: 'CSE Technology Wing',
    floor: 'Ground Floor',
    accessible: true,
    x: 46,
    y: 45,
    gis: {
      lat: 17.45322,
      lng: 78.67576,
      placeId: 'ChIJ_cse_elevator_01',
      formattedAddress: 'Ground Floor Elevator Hub, CSE Block, SNIST Campus',
      googlePlaceTypes: ['elevator']
    },
    metadata: {
      capacity: 20,
      description: 'Wide door wheelchair elevator connecting Ground through 3rd floor labs',
      connectedNodes: ['res-cse-computer-center', 'res-cse-aiml-lab']
    }
  },

  // 4. Electronics & Communication Engineering (ECE) Block
  {
    resourceId: 'res-ece-vlsi-lab',
    type: 'lab',
    name: 'VLSI Design & Microprocessors Lab',
    buildingId: 'block-ece',
    buildingName: 'ECE & VLSI Block',
    department: 'ECE',
    roomNumber: 'EC-202',
    zoneId: 'ECE Innovation Wing',
    floor: '2nd Floor',
    accessible: true,
    x: 72,
    y: 30,
    gis: {
      lat: 17.45350,
      lng: 78.67610,
      placeId: 'ChIJ_snist_vlsi_lab',
      formattedAddress: '2nd Floor, ECE Engineering Block, SNIST Campus',
      googlePlaceTypes: ['electronics_lab', 'university']
    },
    metadata: {
      capacity: 60,
      description: 'Cadence & FPGA hardware emulation lab for semiconductor circuit design',
      connectedNodes: ['res-ece-office', 'res-ece-ramp']
    }
  },
  {
    resourceId: 'res-ece-office',
    type: 'office',
    name: 'ECE Department Enquiry & Faculty Desk',
    buildingId: 'block-ece',
    buildingName: 'ECE & VLSI Block',
    department: 'ECE',
    roomNumber: 'EC-001',
    zoneId: 'ECE Innovation Wing',
    floor: 'Ground Floor',
    accessible: true,
    x: 70,
    y: 35,
    gis: {
      lat: 17.45352,
      lng: 78.67612,
      placeId: 'ChIJ_snist_ece_office',
      formattedAddress: 'Ground Floor, ECE Block, SNIST Campus',
      googlePlaceTypes: ['office']
    },
    metadata: {
      capacity: 25,
      description: 'ECE department office, student project lab key issue desk, and faculty cabins',
      connectedNodes: ['res-ece-vlsi-lab', 'res-ece-ramp', 'res-gate-north']
    }
  },
  {
    resourceId: 'res-ece-ramp',
    type: 'ramp',
    name: 'ECE Block Accessible Ramp Slope',
    buildingId: 'block-ece',
    buildingName: 'ECE & VLSI Block',
    department: 'ECE',
    roomNumber: 'RAMP-EC-01',
    zoneId: 'ECE Innovation Wing',
    floor: 'Ground Floor',
    accessible: true,
    x: 68,
    y: 38,
    gis: {
      lat: 17.45348,
      lng: 78.67608,
      placeId: 'ChIJ_ece_ramp_slope',
      formattedAddress: 'West Slope Entry, ECE Block, SNIST Campus',
      googlePlaceTypes: ['wheelchair_ramp']
    },
    metadata: {
      description: 'Gentle gradient continuous ramp slope for wheelchair access into ECE Ground Floor',
      connectedNodes: ['res-ece-office', 'res-ece-vlsi-lab']
    }
  },

  // 5. Mechanical & Civil Engineering Block
  {
    resourceId: 'res-mech-cad-lab',
    type: 'lab',
    name: 'CAD/CAM & Robotics Workshop',
    buildingId: 'block-mech',
    buildingName: 'Mechanical & Civil Workshop Block',
    department: 'Mechanical',
    roomNumber: 'ME-005',
    zoneId: 'North Engineering Complex',
    floor: 'Ground Floor',
    accessible: true,
    x: 85,
    y: 20,
    gis: {
      lat: 17.45380,
      lng: 78.67640,
      placeId: 'ChIJ_snist_mech_workshop',
      formattedAddress: 'Heavy Machinery Workshop, Mechanical Block, SNIST Campus',
      googlePlaceTypes: ['workshop', 'university']
    },
    metadata: {
      capacity: 90,
      description: 'CNC milling, 3D printing, and industrial robotics prototyping workshop',
      connectedNodes: ['res-gate-north', 'res-ece-office']
    }
  },

  // 6. Central Library & Knowledge Resource Center
  {
    resourceId: 'res-lib-digital',
    type: 'library',
    name: 'Central Digital Library & E-Learning Center',
    buildingId: 'block-library',
    buildingName: 'Central Library & Knowledge Resource Center',
    department: 'Library',
    roomNumber: 'LIB-101',
    zoneId: 'Central Knowledge Hub',
    floor: '1st Floor',
    accessible: true,
    x: 35,
    y: 75,
    gis: {
      lat: 17.45310,
      lng: 78.67560,
      placeId: 'ChIJ_snist_central_library',
      formattedAddress: '1st Floor, Central Library Building, SNIST Campus',
      googlePlaceTypes: ['library', 'point_of_interest']
    },
    metadata: {
      capacity: 350,
      description: 'Silent reading hall with access to IEEE Xplore, ScienceDirect e-journals, and 100 PC terminals',
      connectedNodes: ['res-lib-issue', 'res-lib-restroom']
    }
  },
  {
    resourceId: 'res-lib-issue',
    type: 'counter',
    name: 'Book Circulation & Reference Counter',
    buildingId: 'block-library',
    buildingName: 'Central Library & Knowledge Resource Center',
    department: 'Library',
    roomNumber: 'LIB-001',
    zoneId: 'Central Knowledge Hub',
    floor: 'Ground Floor',
    accessible: true,
    x: 33,
    y: 78,
    gis: {
      lat: 17.45308,
      lng: 78.67558,
      placeId: 'ChIJ_lib_issue_desk',
      formattedAddress: 'Ground Floor Foyer, Central Library, SNIST Campus',
      googlePlaceTypes: ['counter', 'library']
    },
    metadata: {
      capacity: 40,
      description: 'Automated RFID book check-in/check-out counter and student library card desk',
      connectedNodes: ['res-lib-digital', 'res-gate-main']
    }
  },
  {
    resourceId: 'res-lib-restroom',
    type: 'restroom',
    name: 'Central Campus Accessible Restroom',
    buildingId: 'block-library',
    buildingName: 'Central Library & Knowledge Resource Center',
    department: 'Amenities',
    roomNumber: 'WC-LIB-01',
    zoneId: 'Central Knowledge Hub',
    floor: 'Ground Floor',
    accessible: true,
    x: 37,
    y: 80,
    gis: {
      lat: 17.45312,
      lng: 78.67562,
      placeId: 'ChIJ_snist_accessible_wc',
      formattedAddress: 'Ground Floor West Block, Central Library, SNIST Campus',
      googlePlaceTypes: ['restroom']
    },
    metadata: {
      description: 'Gender-neutral accessible restroom equipped with grab bars and emergency assistance button',
      connectedNodes: ['res-lib-digital', 'res-lib-issue']
    }
  },

  // 7. Student Activity Center & Canteen Hub
  {
    resourceId: 'res-canteen-main',
    type: 'canteen',
    name: 'Main Student Food Court & Canteen',
    buildingId: 'block-canteen',
    buildingName: 'Student Activity & Canteen Hub',
    department: 'Amenities',
    roomNumber: 'HUB-001',
    zoneId: 'Student Lifestyle Hub',
    floor: 'Ground Floor',
    accessible: true,
    x: 60,
    y: 70,
    gis: {
      lat: 17.45340,
      lng: 78.67585,
      placeId: 'ChIJ_snist_main_canteen',
      formattedAddress: 'Main Food Court Complex, SNIST Campus',
      googlePlaceTypes: ['food', 'restaurant', 'canteen']
    },
    metadata: {
      capacity: 500,
      description: 'Multi-cuisine student canteen, juice bar, and outdoor seating patio',
      connectedNodes: ['res-sports-arena', 'res-health-center']
    }
  },
  {
    resourceId: 'res-sports-arena',
    type: 'auditorium',
    name: 'Indoor Sports Complex & Student Arena',
    buildingId: 'block-canteen',
    buildingName: 'Student Activity & Canteen Hub',
    department: 'Physical Education',
    roomNumber: 'HUB-102',
    zoneId: 'Student Lifestyle Hub',
    floor: 'Ground Floor',
    accessible: true,
    x: 65,
    y: 65,
    gis: {
      lat: 17.45345,
      lng: 78.67590,
      placeId: 'ChIJ_snist_sports_complex',
      formattedAddress: 'Indoor Sports Arena, SNIST Campus',
      googlePlaceTypes: ['gym', 'sports_complex']
    },
    metadata: {
      capacity: 300,
      description: 'Badminton courts, table tennis hall, gymnasium, and indoor sports equipment store',
      connectedNodes: ['res-canteen-main', 'res-health-center']
    }
  },
  {
    resourceId: 'res-health-center',
    type: 'office',
    name: 'Campus Emergency Health Center & First Aid',
    buildingId: 'block-canteen',
    buildingName: 'Student Activity & Canteen Hub',
    department: 'Health Services',
    roomNumber: 'HUB-005',
    zoneId: 'Student Lifestyle Hub',
    floor: 'Ground Floor',
    accessible: true,
    x: 58,
    y: 75,
    gis: {
      lat: 17.45338,
      lng: 78.67582,
      placeId: 'ChIJ_snist_health_clinic',
      formattedAddress: 'Ground Floor East Wing, Canteen Hub, SNIST Campus',
      googlePlaceTypes: ['doctor', 'health', 'point_of_interest']
    },
    metadata: {
      capacity: 15,
      description: '24/7 resident medical officer, emergency beds, and ambulance dispatch hub',
      connectedNodes: ['res-canteen-main', 'res-sports-arena']
    }
  },

  // 8. Transport & Bus Bay
  {
    resourceId: 'res-bus-terminal',
    type: 'waiting_zone',
    name: 'Student College Bus Terminal & Parking',
    buildingId: 'block-campus',
    buildingName: 'SNIST Main Campus Grounds',
    department: 'Transport Office',
    roomNumber: 'BUS-BAY',
    zoneId: 'South Campus Grounds',
    floor: 'Ground Floor',
    accessible: true,
    x: 15,
    y: 95,
    gis: {
      lat: 17.45230,
      lng: 78.67490,
      placeId: 'ChIJ_snist_bus_terminal',
      formattedAddress: 'South Bus Parking Yard, SNIST Campus, Hyderabad',
      googlePlaceTypes: ['bus_station', 'parking']
    },
    metadata: {
      capacity: 800,
      description: '60+ fleet college bus bays serving Secunderabad, LB Nagar, and Kukatpally routes',
      connectedNodes: ['res-gate-main']
    }
  }
];

export const INITIAL_NODES = [
  {
    nodeId: 'node-visitor-1',
    role: 'visitor' as const,
    displayName: 'Student Mobile App (Android 14)',
    linkState: 'connected' as const,
    lastSeen: Date.now(),
    queueDepth: 0,
    routeEpoch: 1,
    nodeLat: 17.45250,
    nodeLng: 78.67510
  },
  {
    nodeId: 'node-staff-1',
    role: 'staff' as const,
    displayName: 'CSE Faculty Tablet (Nurse/Staff)',
    linkState: 'connected' as const,
    lastSeen: Date.now(),
    queueDepth: 0,
    routeEpoch: 1,
    nodeLat: 17.45320,
    nodeLng: 78.67575
  },
  {
    nodeId: 'node-relay-1',
    role: 'relay' as const,
    displayName: 'Library Volunteer Relay Device',
    linkState: 'connected' as const,
    lastSeen: Date.now(),
    queueDepth: 0,
    routeEpoch: 1,
    nodeLat: 17.45310,
    nodeLng: 78.67560
  },
  {
    nodeId: 'node-coordinator-1',
    role: 'coordinator' as const,
    displayName: 'SNIST Campus Edge Gateway',
    linkState: 'connected' as const,
    lastSeen: Date.now(),
    queueDepth: 0,
    routeEpoch: 1,
    nodeLat: 17.45280,
    nodeLng: 78.67530
  }
];
