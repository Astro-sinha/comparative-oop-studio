import { CurriculumModule } from '../types';

export const CURRICULUM_MODULES: CurriculumModule[] = [
  {
    code: 'M01',
    pillar: 'Basics',
    title: 'Classes & Objects (The Blueprint vs House)',
    subtitle: 'Learn how to model real-world entities into software blueprints and object instances.',
    analogy: 'Architectural Blueprint vs Built House: A Class is like an architectural blueprint drawn on paper. It defines the room count, color, and doors. An Object is the actual house built from that blueprint on a real piece of land!',
    summary: 'Procedural programming groups code around functions acting on data. Object-Oriented Programming (OOP) packages data (attributes) and behaviors (methods) together into a single unit called a Class. Objects are instances created from that Class.',
    keyTakeaways: [
      'Class: A user-defined data type serving as a blueprint.',
      'Object: An instance of a class allocated in memory.',
      'Attributes: Variables inside a class that hold state.',
      'Methods: Functions inside a class that define behavior.'
    ],
    starterCode: {
      cpp: `// M01: Classes & Objects - C++
#include <iostream>
#include <string>

class Student {
public:
    std::string name;
    int rollNumber;

    void displayDetails() {
        std::cout << "Student: " << name << " | Roll: " << rollNumber << std::endl;
    }
};

int main() {
    Student s1;
    s1.name = "Alice";
    s1.rollNumber = 101;
    s1.displayDetails();

    Student s2;
    s2.name = "Bob";
    s2.rollNumber = 102;
    s2.displayDetails();
    return 0;
}`,
      java: `// M01: Classes & Objects - Java
public class Main {
    public static class Student {
        public String name;
        public int rollNumber;

        public void displayDetails() {
            System.out.println("Student: " + name + " | Roll: " + rollNumber);
        }
    }

    public static void main(String[] args) {
        Student s1 = new Student();
        s1.name = "Alice";
        s1.rollNumber = 101;
        s1.displayDetails();

        Student s2 = new Student();
        s2.name = "Bob";
        s2.rollNumber = 102;
        s2.displayDetails();
    }
}`,
      python: `# M01: Classes & Objects - Python
class Student:
    def __init__(self, name="", roll_number=0):
        self.name = name
        self.roll_number = roll_number

    def display_details(self):
        print(f"Student: {self.name} | Roll: {self.roll_number}")

s1 = Student("Alice", 101)
s1.display_details()

s2 = Student("Bob", 102)
s2.display_details()`
    },
    expectedOutput: {
      cpp: 'Student: Alice | Roll: 101\nStudent: Bob | Roll: 102',
      java: 'Student: Alice | Roll: 101\nStudent: Bob | Roll: 102',
      python: 'Student: Alice | Roll: 101\nStudent: Bob | Roll: 102'
    },
    diagram: {
      title: 'Class Diagram: Student Instance Creation',
      nodes: [
        {
          id: 'StudentClass',
          name: 'Student',
          stereotype: 'class',
          attributes: [
            { name: 'name', type: 'String', visibility: '+' },
            { name: 'rollNumber', type: 'Integer', visibility: '+' }
          ],
          methods: [
            { name: 'displayDetails()', parameters: '', returnType: 'void', visibility: '+' }
          ]
        }
      ],
      relationships: []
    },
    quiz: [
      {
        question: 'What is the primary difference between a Class and an Object?',
        options: [
          'A Class is an instance in memory; an Object is the blueprint.',
          'A Class is a blueprint; an Object is a concrete instance in memory.',
          'Classes can only store numbers, while Objects store text.',
          'There is no difference; the terms are 100% interchangeable.'
        ],
        correctIndex: 1,
        explanation: 'A Class defines the template/blueprint, while an Object is the actual instance allocated in memory during program execution.'
      }
    ]
  },
  {
    code: 'M02',
    pillar: 'Encapsulation',
    title: 'Pillar 1: Encapsulation (Data Hiding & Protection)',
    subtitle: 'Protect sensitive data using access modifiers (+public, -private) and getters/setters.',
    analogy: 'Capsule Medication or ATM Machine: You cannot access the internal cash vault directly. You must use the keypad (getter/setter) which validates your PIN before giving money!',
    summary: 'Encapsulation binds data and functions together into a single component while restricting direct access to internal state. Private attributes (-private) can only be accessed through public methods (+getters/+setters) which validate inputs.',
    keyTakeaways: [
      'Data Hiding: Prevents external code from corrupting internal object state.',
      'Access Modifiers: `private` (internal only), `public` (accessible everywhere), `protected` (derived classes).',
      'Getters & Setters: Controlled access points that enforce validation logic (e.g. balance cannot be negative).'
    ],
    starterCode: {
      cpp: `// M02: Encapsulation - C++
#include <iostream>
#include <string>

class BankAccount {
private:
    std::string accountNumber;
    double balance;

public:
    BankAccount(std::string accNum, double initialBalance) {
        accountNumber = accNum;
        balance = initialBalance > 0 ? initialBalance : 0;
    }

    void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            std::cout << "Deposited $" << amount << ". New Balance: $" << balance << std::endl;
        }
    }

    double getBalance() const {
        return balance;
    }
};

int main() {
    BankAccount acc("ACC-9081", 500.0);
    acc.deposit(250.0);
    std::cout << "Final Balance: $" << acc.getBalance() << std::endl;
    return 0;
}`,
      java: `// M02: Encapsulation - Java
public class Main {
    public static class BankAccount {
        private String accountNumber;
        private double balance;

        public BankAccount(String accNum, double initialBalance) {
            this.accountNumber = accNum;
            this.balance = initialBalance > 0 ? initialBalance : 0;
        }

        public void deposit(double amount) {
            if (amount > 0) {
                this.balance += amount;
                System.out.println("Deposited $" + amount + ". New Balance: $" + this.balance);
            }
        }

        public double getBalance() {
            return this.balance;
        }
    }

    public static void main(String[] args) {
        BankAccount acc = new BankAccount("ACC-9081", 500.0);
        acc.deposit(250.0);
        System.out.println("Final Balance: $" + acc.getBalance());
    }
}`,
      python: `# M02: Encapsulation - Python
class BankAccount:
    def __init__(self, acc_num, initial_balance):
        self._account_number = acc_num
        self.__balance = initial_balance if initial_balance > 0 else 0

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            print(f"Deposited \${amount}. New Balance: \${self.__balance}")

    def get_balance(self):
        return self.__balance

acc = BankAccount("ACC-9081", 500.0)
acc.deposit(250.0)
print(f"Final Balance: \${acc.get_balance()}")`
    },
    expectedOutput: {
      cpp: 'Deposited $250. New Balance: $750\nFinal Balance: $750',
      java: 'Deposited $250. New Balance: $750.0\nFinal Balance: $750.0',
      python: 'Deposited $250. New Balance: $750.0\nFinal Balance: $750.0'
    },
    diagram: {
      title: 'Class Diagram: Encapsulated BankAccount',
      nodes: [
        {
          id: 'BankAccountClass',
          name: 'BankAccount',
          stereotype: 'class',
          attributes: [
            { name: 'accountNumber', type: 'String', visibility: '-' },
            { name: 'balance', type: 'Double', visibility: '-' }
          ],
          methods: [
            { name: 'deposit(amount)', parameters: 'double', returnType: 'void', visibility: '+' },
            { name: 'getBalance()', parameters: '', returnType: 'double', visibility: '+' }
          ]
        }
      ],
      relationships: []
    },
    quiz: [
      {
        question: 'Why do we make instance variables private in Encapsulation?',
        options: [
          'To make the program execute 10x faster.',
          'To hide implementation details and prevent unauthorized modifications.',
          'Because private variables do not consume memory.',
          'So that other programmers cannot read the code.'
        ],
        correctIndex: 1,
        explanation: 'Making attributes private enforces data hiding, ensuring data integrity by preventing external code from bypassing validation.'
      }
    ]
  },
  {
    code: 'M03',
    pillar: 'Abstraction',
    title: 'Pillar 2: Abstraction (Hiding Internal Complexity)',
    subtitle: 'Expose simple interfaces while hiding complex internal mechanics behind the scenes.',
    analogy: 'Car Dashboard & Ignition Switch: To drive a car, you push a start button and turn the steering wheel. You don’t need to manually inject fuel, spark ignition plugs, or manage piston timing!',
    summary: 'Abstraction shows only essential features of an object to the outside world while masking complex low-level implementation details. Users interact with simple methods (`startCar()`) without worrying about internal mechanics.',
    keyTakeaways: [
      'Simplifies Interaction: Reduces system complexity for external callers.',
      'Flexibility: Internal implementation details can change without breaking caller code.',
      'Separation of Concerns: High-level interface vs low-level execution.'
    ],
    starterCode: {
      cpp: `// M03: Abstraction - C++
#include <iostream>

class SmartThermostat {
private:
    void igniteHeatingElement() {
        std::cout << "[Internal] Heating coils energized..." << std::endl;
    }
    void startFanCirculation() {
        std::cout << "[Internal] Air circulation blower active..." << std::endl;
    }

public:
    void setTemperature(int targetTemp) {
        std::cout << "User set temp to " << targetTemp << "C." << std::endl;
        igniteHeatingElement();
        startFanCirculation();
        std::cout << "Climate target reached!" << std::endl;
    }
};

int main() {
    SmartThermostat thermostat;
    thermostat.setTemperature(22);
    return 0;
}`,
      java: `// M03: Abstraction - Java
public class Main {
    public static class SmartThermostat {
        private void igniteHeatingElement() {
            System.out.println("[Internal] Heating coils energized...");
        }
        private void startFanCirculation() {
            System.out.println("[Internal] Air circulation blower active...");
        }

        public void setTemperature(int targetTemp) {
            System.out.println("User set temp to " + targetTemp + "C.");
            igniteHeatingElement();
            startFanCirculation();
            System.out.println("Climate target reached!");
        }
    }

    public static void main(String[] args) {
        SmartThermostat thermostat = new SmartThermostat();
        thermostat.setTemperature(22);
    }
}`,
      python: `# M03: Abstraction - Python
class SmartThermostat:
    def __ignite_heating_element(self):
        print("[Internal] Heating coils energized...")

    def __start_fan_circulation(self):
        print("[Internal] Air circulation blower active...")

    def set_temperature(self, target_temp):
        print(f"User set temp to {target_temp}C.")
        self.__ignite_heating_element()
        self.__start_fan_circulation()
        print("Climate target reached!")

thermostat = SmartThermostat()
thermostat.set_temperature(22)`
    },
    expectedOutput: {
      cpp: 'User set temp to 22C.\n[Internal] Heating coils energized...\n[Internal] Air circulation blower active...\nClimate target reached!',
      java: 'User set temp to 22C.\n[Internal] Heating coils energized...\n[Internal] Air circulation blower active...\nClimate target reached!',
      python: 'User set temp to 22C.\n[Internal] Heating coils energized...\n[Internal] Air circulation blower active...\nClimate target reached!'
    },
    diagram: {
      title: 'Class Diagram: Abstraction Layer',
      nodes: [
        {
          id: 'ThermostatClass',
          name: 'SmartThermostat',
          stereotype: 'class',
          attributes: [],
          methods: [
            { name: 'igniteHeatingElement()', parameters: '', returnType: 'void', visibility: '-' },
            { name: 'startFanCirculation()', parameters: '', returnType: 'void', visibility: '-' },
            { name: 'setTemperature(temp)', parameters: 'int', returnType: 'void', visibility: '+' }
          ]
        }
      ],
      relationships: []
    },
    quiz: [
      {
        question: 'How does Abstraction differ from Encapsulation?',
        options: [
          'Abstraction hides complexity; Encapsulation hides/protects internal state data.',
          'Abstraction is only for C++, while Encapsulation is for Java.',
          'Abstraction makes variables public, while Encapsulation makes variables private.',
          'They are identical concepts.'
        ],
        correctIndex: 0,
        explanation: 'Abstraction focuses on "WHAT" an object does by hiding internal complexity behind simple methods, whereas Encapsulation focuses on "HOW" data is bundled and protected.'
      }
    ]
  },
  {
    code: 'M04',
    pillar: 'Inheritance',
    title: 'Pillar 3: Inheritance (Code Reuse & Hierarchy)',
    subtitle: 'Derive new child classes from existing parent classes to reuse code and build hierarchies.',
    analogy: 'Parent and Child Genetics: A child inherits traits (eye color, hair, last name) from their parent, but can also acquire unique skills (e.g. playing guitar) of their own!',
    summary: 'Inheritance allows a Derived (Child) class to acquire properties and methods from a Base (Parent) class (`Child extends Parent` in Java, `class Child : public Parent` in C++, `class Child(Parent):` in Python). This avoids code duplication.',
    keyTakeaways: [
      'Code Reuse: Write once in parent class, use across multiple child classes.',
      'Extensibility: Add unique attributes and methods in derived classes.',
      'Super Keyword: Access parent constructors/methods (`super()` in Java/Python, `Parent()` in C++).'
    ],
    starterCode: {
      cpp: `// M04: Inheritance - C++
#include <iostream>
#include <string>

// Base Class (Parent)
class Vehicle {
public:
    std::string brand;
    void startEngine() {
        std::cout << brand << " engine started: Vroom Vroom!" << std::endl;
    }
};

// Derived Class (Child)
class ElectricCar : public Vehicle {
public:
    int batteryCapacity;

    void chargeBattery() {
        std::cout << brand << " charging " << batteryCapacity << " kWh battery..." << std::endl;
    }
};

int main() {
    ElectricCar tesla;
    tesla.brand = "Tesla Model S";
    tesla.batteryCapacity = 100;
    
    // Inherited method from Vehicle parent
    tesla.startEngine();
    // Unique method in ElectricCar
    tesla.chargeBattery();
    return 0;
}`,
      java: `// M04: Inheritance - Java
public class Main {
    // Base Class (Parent)
    public static class Vehicle {
        public String brand;
        public void startEngine() {
            System.out.println(brand + " engine started: Vroom Vroom!");
        }
    }

    // Derived Class (Child)
    public static class ElectricCar extends Vehicle {
        public int batteryCapacity;

        public void chargeBattery() {
            System.out.println(brand + " charging " + batteryCapacity + " kWh battery...");
        }
    }

    public static void main(String[] args) {
        ElectricCar tesla = new ElectricCar();
        tesla.brand = "Tesla Model S";
        tesla.batteryCapacity = 100;

        // Inherited method
        tesla.startEngine();
        // Child specific method
        tesla.chargeBattery();
    }
}`,
      python: `# M04: Inheritance - Python
# Base Class (Parent)
class Vehicle:
    def __init__(self, brand=""):
        self.brand = brand

    def start_engine(self):
        print(f"{self.brand} engine started: Vroom Vroom!")

# Derived Class (Child)
class ElectricCar(Vehicle):
    def __init__(self, brand="", battery_capacity=0):
        super().__init__(brand)
        self.battery_capacity = battery_capacity

    def charge_battery(self):
        print(f"{self.brand} charging {self.battery_capacity} kWh battery...")

tesla = ElectricCar("Tesla Model S", 100)
tesla.start_engine()
tesla.charge_battery()`
    },
    expectedOutput: {
      cpp: 'Tesla Model S engine started: Vroom Vroom!\nTesla Model S charging 100 kWh battery...',
      java: 'Tesla Model S engine started: Vroom Vroom!\nTesla Model S charging 100 kWh battery...',
      python: 'Tesla Model S engine started: Vroom Vroom!\nTesla Model S charging 100 kWh battery...'
    },
    diagram: {
      title: 'UML Hierarchy Diagram: Inheritance (Is-A Relationship)',
      nodes: [
        {
          id: 'VehicleClass',
          name: 'Vehicle',
          stereotype: 'class',
          attributes: [{ name: 'brand', type: 'String', visibility: '+' }],
          methods: [{ name: 'startEngine()', parameters: '', returnType: 'void', visibility: '+' }]
        },
        {
          id: 'ElectricCarClass',
          name: 'ElectricCar',
          stereotype: 'class',
          attributes: [{ name: 'batteryCapacity', type: 'Integer', visibility: '+' }],
          methods: [{ name: 'chargeBattery()', parameters: '', returnType: 'void', visibility: '+' }]
        }
      ],
      relationships: [
        {
          id: 'r1',
          sourceId: 'ElectricCarClass',
          targetId: 'VehicleClass',
          type: 'inheritance',
          label: 'extends / inherits'
        }
      ]
    },
    quiz: [
      {
        question: 'Which keyword is used in Java to establish inheritance between classes?',
        options: ['implements', 'extends', 'inherits', 'super'],
        correctIndex: 1,
        explanation: 'In Java, the `extends` keyword is used to derive a child class from a parent class.'
      }
    ]
  },
  {
    code: 'M05',
    pillar: 'Polymorphism',
    title: 'Pillar 4: Polymorphism (Many Forms & Dynamic Dispatch)',
    subtitle: 'Use unified interfaces to trigger different behaviors at compile-time and runtime.',
    analogy: 'The "Play" Button on Media Players: A Play button behaves differently depending on what is loaded. On a music app, it plays sound; on a video app, it streams video; on a game, it starts gameplay!',
    summary: 'Polymorphism means "many forms". It allows objects of different classes to respond to the same method call in their own specific way. Includes Compile-time Polymorphism (Method Overloading) and Runtime Polymorphism (Method Overriding via virtual functions).',
    keyTakeaways: [
      'Method Overriding: Child class rewrites a parent method with custom behavior.',
      'Dynamic Dispatch: The correct method is invoked dynamically based on the actual runtime object type.',
      'Flexibility: Write generic code that operates on base class pointers/references.'
    ],
    starterCode: {
      cpp: `// M05: Polymorphism - C++
#include <iostream>
#include <vector>

// Base Class
class Animal {
public:
    virtual void makeSound() {
        std::cout << "Generic animal sound" << std::endl;
    }
};

class Dog : public Animal {
public:
    void makeSound() override {
        std::cout << "Dog barks: Woof Woof!" << std::endl;
    }
};

class Cat : public Animal {
public:
    void makeSound() override {
        std::cout << "Cat meows: Meow Meow!" << std::endl;
    }
};

int main() {
    Animal* myDog = new Dog();
    Animal* myCat = new Cat();

    myDog->makeSound(); // Invokes Dog's overridden method
    myCat->makeSound(); // Invokes Cat's overridden method

    delete myDog;
    delete myCat;
    return 0;
}`,
      java: `// M05: Polymorphism - Java
public class Main {
    public static class Animal {
        public void makeSound() {
            System.out.println("Generic animal sound");
        }
    }

    public static class Dog extends Animal {
        @Override
        public void makeSound() {
            System.out.println("Dog barks: Woof Woof!");
        }
    }

    public static class Cat extends Animal {
        @Override
        public void makeSound() {
            System.out.println("Cat meows: Meow Meow!");
        }
    }

    public static void main(String[] args) {
        Animal myDog = new Dog();
        Animal myCat = new Cat();

        myDog.makeSound();
        myCat.makeSound();
    }
}`,
      python: `# M05: Polymorphism - Python
class Animal:
    def make_sound(self):
        print("Generic animal sound")

class Dog(Animal):
    def make_sound(self):
        print("Dog barks: Woof Woof!")

class Cat(Animal):
    def make_sound(self):
        print("Cat meows: Meow Meow!")

animals = [Dog(), Cat()]
for animal in animals:
    animal.make_sound()`
    },
    expectedOutput: {
      cpp: 'Dog barks: Woof Woof!\nCat meows: Meow Meow!',
      java: 'Dog barks: Woof Woof!\nCat meows: Meow Meow!',
      python: 'Dog barks: Woof Woof!\nCat meows: Meow Meow!'
    },
    diagram: {
      title: 'Polymorphic Hierarchy UML Diagram',
      nodes: [
        {
          id: 'AnimalClass',
          name: 'Animal',
          stereotype: 'class',
          attributes: [],
          methods: [{ name: 'makeSound()', parameters: '', returnType: 'void', visibility: '+' }]
        },
        {
          id: 'DogClass',
          name: 'Dog',
          stereotype: 'class',
          attributes: [],
          methods: [{ name: 'makeSound()', parameters: '', returnType: 'void', visibility: '+' }]
        },
        {
          id: 'CatClass',
          name: 'Cat',
          stereotype: 'class',
          attributes: [],
          methods: [{ name: 'makeSound()', parameters: '', returnType: 'void', visibility: '+' }]
        }
      ],
      relationships: [
        { id: 'p1', sourceId: 'DogClass', targetId: 'AnimalClass', type: 'inheritance', label: 'overrides' },
        { id: 'p2', sourceId: 'CatClass', targetId: 'AnimalClass', type: 'inheritance', label: 'overrides' }
      ]
    },
    quiz: [
      {
        question: 'What keyword in C++ enables runtime polymorphism via dynamic method dispatch?',
        options: ['static', 'virtual', 'override', 'polymorphic'],
        correctIndex: 1,
        explanation: 'In C++, marking a base class member function as `virtual` creates a VTable entry for dynamic dispatch at runtime.'
      }
    ]
  },
  {
    code: 'M06',
    pillar: 'Association',
    title: 'Pillar 5: Object Relationships (Composition vs Aggregation)',
    subtitle: 'Build complex systems by assembling smaller objects together (Has-A Relationships).',
    analogy: 'Car & Engine vs Computer & USB Drive: A Car HAS-AN Engine (Composition: if car is scrapped, engine dies). A Computer HAS-A USB Drive (Aggregation: USB drive exists independently even if computer is unplugged!).',
    summary: 'Association represents relationships between objects. Composition is a strong "Has-A" relationship where the child component lifetime is tied to the parent. Aggregation is a weak "Has-A" relationship where child objects can exist independently.',
    keyTakeaways: [
      'Composition (Strong Has-A): Parent owns child lifecycle (e.g. Heart in Human).',
      'Aggregation (Weak Has-A): Parent uses child, but child lifecycle is independent (e.g. Teacher in School).',
      'Prefer Composition over Inheritance: Flexible architecture design principle.'
    ],
    starterCode: {
      cpp: `// M06: Composition & Aggregation - C++
#include <iostream>
#include <string>

class Engine {
public:
    int horsepower;
    Engine(int hp) : horsepower(hp) {}
    void rev() {
        std::cout << "Engine revs with " << horsepower << " HP!" << std::endl;
    }
};

// Composition: Car HAS-AN Engine inside it
class SportsCar {
private:
    std::string model;
    Engine engine; // Engine lifetime bound to SportsCar

public:
    SportsCar(std::string m, int hp) : model(m), engine(hp) {}

    void drive() {
        std::cout << model << " driving..." << std::endl;
        engine.rev();
    }
};

int main() {
    SportsCar car("Ferrari F8", 710);
    car.drive();
    return 0;
}`,
      java: `// M06: Composition & Aggregation - Java
public class Main {
    public static class Engine {
        public int horsepower;
        public Engine(int hp) {
            this.horsepower = hp;
        }
        public void rev() {
            System.out.println("Engine revs with " + horsepower + " HP!");
        }
    }

    public static class SportsCar {
        private String model;
        private Engine engine; // Composition

        public SportsCar(String model, int hp) {
            this.model = model;
            this.engine = new Engine(hp);
        }

        public void drive() {
            System.out.println(model + " driving...");
            engine.rev();
        }
    }

    public static void main(String[] args) {
        SportsCar car = new SportsCar("Ferrari F8", 710);
        car.drive();
    }
}`,
      python: `# M06: Composition & Aggregation - Python
class Engine:
    def __init__(self, hp):
        self.horsepower = hp

    def rev(self):
        print(f"Engine revs with {self.horsepower} HP!")

class SportsCar:
    def __init__(self, model, hp):
        self.model = model
        self.engine = Engine(hp) # Composition

    def drive(self):
        print(f"{self.model} driving...")
        self.engine.rev()

car = SportsCar("Ferrari F8", 710)
car.drive()`
    },
    expectedOutput: {
      cpp: 'Ferrari F8 driving...\nEngine revs with 710 HP!',
      java: 'Ferrari F8 driving...\nEngine revs with 710 HP!',
      python: 'Ferrari F8 driving...\nEngine revs with 710 HP!'
    },
    diagram: {
      title: 'Composition UML Diagram (Has-A Relationship)',
      nodes: [
        {
          id: 'CarClass',
          name: 'SportsCar',
          stereotype: 'class',
          attributes: [{ name: 'model', type: 'String', visibility: '-' }],
          methods: [{ name: 'drive()', parameters: '', returnType: 'void', visibility: '+' }]
        },
        {
          id: 'EngineClass',
          name: 'Engine',
          stereotype: 'class',
          attributes: [{ name: 'horsepower', type: 'Integer', visibility: '+' }],
          methods: [{ name: 'rev()', parameters: '', returnType: 'void', visibility: '+' }]
        }
      ],
      relationships: [
        {
          id: 'c1',
          sourceId: 'CarClass',
          targetId: 'EngineClass',
          type: 'composition',
          label: 'has-a (owns)'
        }
      ]
    },
    quiz: [
      {
        question: 'What distinguishes Composition from Aggregation?',
        options: [
          'In Composition, the child object lifecycle dies with the parent object.',
          'In Aggregation, child objects cannot be created.',
          'Composition uses inheritance, while Aggregation does not.',
          'They are identical.'
        ],
        correctIndex: 0,
        explanation: 'Composition implies strong ownership where destroying the parent container destroys the child component as well.'
      }
    ]
  },
  {
    code: 'M07',
    pillar: 'Interfaces',
    title: 'Pillar 6: Interfaces & Abstract Classes (Contracts & Protocols)',
    subtitle: 'Define standard behavior contracts that multiple unrelated classes must fulfill.',
    analogy: 'Standardized Electrical Wall Socket: The wall socket defines a 3-prong interface standard. Any appliance (TV, Laptop charger, Lamp) can plug into it as long as it implements the plug contract!',
    summary: 'An Interface (or Pure Abstract Class in C++) defines a contract of required methods without providing implementation details. Classes that implement the interface promise to provide full implementations for all contract methods.',
    keyTakeaways: [
      'Contract Enforcement: Guarantees implementing classes fulfill specific method signatures.',
      'Decoupling: Enables high modularity and clean testable architectures.',
      'Multiple Interface Support: Java & C++ allow implementing multiple interface contracts.'
    ],
    starterCode: {
      cpp: `// M07: Interfaces - C++
#include <iostream>

// Pure Abstract Class (Interface in C++)
class Drivable {
public:
    virtual void accelerate() = 0; // Pure virtual function
    virtual ~Drivable() {}
};

class ElectricScooter : public Drivable {
public:
    void accelerate() override {
        std::cout << "Scooter accelerates silently via battery power!" << std::endl;
    }
};

int main() {
    Drivable* scooter = new ElectricScooter();
    scooter->accelerate();
    delete scooter;
    return 0;
}`,
      java: `// M07: Interfaces - Java
public class Main {
    // Interface Contract
    public interface Drivable {
        void accelerate();
    }

    public static class ElectricScooter implements Drivable {
        @Override
        public void accelerate() {
            System.out.println("Scooter accelerates silently via battery power!");
        }
    }

    public static void main(String[] args) {
        Drivable scooter = new ElectricScooter();
        scooter.accelerate();
    }
}`,
      python: `# M07: Interfaces - Python
from abc import ABC, abstractmethod

# Abstract Base Class Interface
class Drivable(ABC):
    @abstractmethod
    def accelerate(self):
        pass

class ElectricScooter(Drivable):
    def accelerate(self):
        print("Scooter accelerates silently via battery power!")

scooter = ElectricScooter()
scooter.accelerate()`
    },
    expectedOutput: {
      cpp: 'Scooter accelerates silently via battery power!',
      java: 'Scooter accelerates silently via battery power!',
      python: 'Scooter accelerates silently via battery power!'
    },
    diagram: {
      title: 'Interface Implementation UML Diagram',
      nodes: [
        {
          id: 'DrivableInterface',
          name: 'Drivable',
          stereotype: 'interface',
          attributes: [],
          methods: [{ name: 'accelerate()', parameters: '', returnType: 'void', visibility: '+', isAbstract: true }]
        },
        {
          id: 'ScooterClass',
          name: 'ElectricScooter',
          stereotype: 'class',
          attributes: [],
          methods: [{ name: 'accelerate()', parameters: '', returnType: 'void', visibility: '+' }]
        }
      ],
      relationships: [
        {
          id: 'i1',
          sourceId: 'ScooterClass',
          targetId: 'DrivableInterface',
          type: 'realization',
          label: 'implements'
        }
      ]
    },
    quiz: [
      {
        question: 'What defines a C++ pure virtual function that turns a class into an Interface?',
        options: ['virtual void func() = 0;', 'abstract void func();', 'interface void func();', 'virtual static void func();'],
        correctIndex: 0,
        explanation: 'Assigning `= 0` to a virtual function declaration in C++ makes it a pure virtual function, creating an abstract interface.'
      }
    ]
  }
];
