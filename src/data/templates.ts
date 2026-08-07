import { AssignmentTemplate } from '../types';

export const ASSIGNMENT_TEMPLATES: AssignmentTemplate[] = [
  {
    code: 'A01',
    title: 'Introduction to Classes',
    subtitle: 'Define class structures, data members, and basic member functions across C++, Java, and Python.',
    learningObjectives: [
      'Understand class syntax and scope definitions in static vs dynamic languages.',
      'Declare public properties and create default object instances.',
      'Implement basic output methods to display instance details.'
    ],
    instructions: [
      'Create a `Student` class containing attributes `name` (String), `age` (Integer), and `gpa` (Double/Float).',
      'Implement a method `displayInfo()` (or `display_info()` in Python) that prints formatted student metadata to stdout.',
      'In the main execution context, instantiate at least two `Student` objects and invoke their info methods.'
    ],
    submissionChecklist: [
      'Class definition includes name, age, and gpa fields in all 3 languages.',
      'displayInfo method produces clear formatted output.',
      'Main entry point creates 2 objects and calls displayInfo for both.',
      'Code compiles/runs without syntax errors.'
    ],
    starterCode: {
      cpp: `// A01: Introduction to Classes - C++
#include <iostream>
#include <string>

class Student {
public:
    std::string name;
    int age;
    double gpa;

    void displayInfo() {
        std::cout << "Student: " << name << " | Age: " << age << " | GPA: " << gpa << std::endl;
    }
};

int main() {
    Student s1;
    s1.name = "Alice Vance";
    s1.age = 20;
    s1.gpa = 3.85;

    Student s2;
    s2.name = "Bob Smith";
    s2.age = 22;
    s2.gpa = 3.60;

    s1.displayInfo();
    s2.displayInfo();

    return 0;
}
`,
      java: `// A01: Introduction to Classes - Java
public class Main {
    public static class Student {
        public String name;
        public int age;
        public double gpa;

        public void displayInfo() {
            System.out.println("Student: " + name + " | Age: " + age + " | GPA: " + gpa);
        }
    }

    public static void main(String[] args) {
        Student s1 = new Student();
        s1.name = "Alice Vance";
        s1.age = 20;
        s1.gpa = 3.85;

        Student s2 = new Student();
        s2.name = "Bob Smith";
        s2.age = 22;
        s2.gpa = 3.60;

        s1.displayInfo();
        s2.displayInfo();
    }
}
`,
      python: `# A01: Introduction to Classes - Python

class Student:
    def __init__(self):
        self.name = ""
        self.age = 0
        self.gpa = 0.0

    def display_info(self):
        print(f"Student: {self.name} | Age: {self.age} | GPA: {self.gpa}")

if __name__ == "__main__":
    s1 = Student()
    s1.name = "Alice Vance"
    s1.age = 20
    s1.gpa = 3.85

    s2 = Student()
    s2.name = "Bob Smith"
    s2.age = 22
    s2.gpa = 3.60

    s1.display_info()
    s2.display_info()
`
    }
  },
  {
    code: 'A02',
    title: 'Constructors and Methods',
    subtitle: 'Implement parameterized constructors, destructor/cleanup logic, and overloaded methods.',
    learningObjectives: [
      'Master explicit constructors for state initialization.',
      'Compare memory initialization in C++ initialization lists, Java constructors, and Python __init__.',
      'Implement utility methods with validation logic.'
    ],
    instructions: [
      'Create a `BankAccount` class with `accountNumber`, `holderName`, and `balance`.',
      'Provide a parameterized constructor that initializes all fields upon creation.',
      'Implement `deposit(amount)` and `withdraw(amount)` methods with insufficient balance checks.',
      'Test account creation, valid deposit, invalid withdrawal, and balance reporting.'
    ],
    submissionChecklist: [
      'Parameterized constructor initializes accountNumber, holderName, and balance.',
      'deposit method increases balance correctly.',
      'withdraw method checks balance and prints error if withdrawal > balance.',
      'All 3 languages demonstrate successful deposit and rejected withdrawal.'
    ],
    starterCode: {
      cpp: `// A02: Constructors and Methods - C++
#include <iostream>
#include <string>

class BankAccount {
private:
    std::string accountNumber;
    std::string holderName;
    double balance;

public:
    // Parameterized constructor using initializer list
    BankAccount(std::string accNum, std::string name, double initialBalance)
        : accountNumber(accNum), holderName(name), balance(initialBalance) {}

    void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            std::cout << "Deposited $" << amount << ". New Balance: $" << balance << std::endl;
        }
    }

    bool withdraw(double amount) {
        if (amount > balance) {
            std::cout << "Withdrawal failed: Insufficient funds!" << std::endl;
            return false;
        }
        balance -= amount;
        std::cout << "Withdrew $" << amount << ". Remaining Balance: $" << balance << std::endl;
        return true;
    }

    void printSummary() const {
        std::cout << "Account [" << accountNumber << "] - Holder: " << holderName << " | Balance: $" << balance << std::endl;
    }
};

int main() {
    BankAccount acc("ACC-101", "Dr. Sarah Connor", 1250.00);
    acc.printSummary();
    acc.deposit(350.50);
    acc.withdraw(2000.00); // Insufficient
    acc.withdraw(500.00);  // Successful
    return 0;
}
`,
      java: `// A02: Constructors and Methods - Java
public class Main {
    public static class BankAccount {
        private String accountNumber;
        private String holderName;
        private double balance;

        public BankAccount(String accountNumber, String holderName, double initialBalance) {
            this.accountNumber = accountNumber;
            this.holderName = holderName;
            this.balance = initialBalance;
        }

        public void deposit(double amount) {
            if (amount > 0) {
                balance += amount;
                System.out.println("Deposited $" + amount + ". New Balance: $" + balance);
            }
        }

        public boolean withdraw(double amount) {
            if (amount > balance) {
                System.out.println("Withdrawal failed: Insufficient funds!");
                return false;
            }
            balance -= amount;
            System.out.println("Withdrew $" + amount + ". Remaining Balance: $" + balance);
            return true;
        }

        public void printSummary() {
            System.out.println("Account [" + accountNumber + "] - Holder: " + holderName + " | Balance: $" + balance);
        }
    }

    public static void main(String[] args) {
        BankAccount acc = new BankAccount("ACC-101", "Dr. Sarah Connor", 1250.00);
        acc.printSummary();
        acc.deposit(350.50);
        acc.withdraw(2000.00); // Insufficient
        acc.withdraw(500.00);  // Successful
    }
}
`,
      python: `# A02: Constructors and Methods - Python

class BankAccount:
    def __init__(self, account_number: str, holder_name: str, initial_balance: float):
        self.account_number = account_number
        self.holder_name = holder_name
        self.balance = initial_balance

    def deposit(self, amount: float):
        if amount > 0:
            self.balance += amount
            print(f"Deposited \${amount}. New Balance: \${self.balance}")

    def withdraw(self, amount: float) -> bool:
        if amount > self.balance:
            print("Withdrawal failed: Insufficient funds!")
            return False
        self.balance -= amount
        print(f"Withdrew \${amount}. Remaining Balance: \${self.balance}")
        return True

    def print_summary(self):
        print(f"Account [{self.account_number}] - Holder: {self.holder_name} | Balance: \${self.balance}")

if __name__ == "__main__":
    acc = BankAccount("ACC-101", "Dr. Sarah Connor", 1250.00)
    acc.print_summary()
    acc.deposit(350.50)
    acc.withdraw(2000.00) # Insufficient
    acc.withdraw(500.00)  # Successful
`
    }
  },
  {
    code: 'A03',
    title: 'Classes, Objects, and Encapsulation',
    subtitle: 'Enforce access modifiers, getter/setter data integrity, and private state encapsulation.',
    learningObjectives: [
      'Enforce encapsulation via private/protected fields.',
      'Implement property validation in setters.',
      'Compare language access specifiers (`private` in C++/Java vs `_` prefix and `@property` in Python).'
    ],
    instructions: [
      'Design a `SensorData` class tracking `sensorId`, `reading` (0.0 to 100.0), and `status` ("OK" or "ALERT").',
      'Keep internal fields encapsulated and accessible only through getters/setters.',
      'In setter `setReading(value)`, enforce boundary validation: if value < 0 or > 100, reject update and trigger status="ALERT".',
      'Demonstrate valid and out-of-bound sensor reading updates.'
    ],
    submissionChecklist: [
      'Private attributes with public getters/setters in C++, Java, and Python.',
      'Validation in setter rejects values < 0 or > 100.',
      'Status automatically toggles to ALERT on out-of-bound attempts.',
      'All 3 languages demonstrate working getter/setter behavior.'
    ],
    starterCode: {
      cpp: `// A03: Classes, Objects, and Encapsulation - C++
#include <iostream>
#include <string>

class SensorData {
private:
    std::string sensorId;
    double reading;
    std::string status;

public:
    SensorData(std::string id, double initialReading) : sensorId(id), status("OK") {
        setReading(initialReading);
    }

    std::string getSensorId() const { return sensorId; }
    double getReading() const { return reading; }
    std::string getStatus() const { return status; }

    void setReading(double value) {
        if (value < 0.0 || value > 100.0) {
            std::cout << "[ERROR] Invalid reading: " << value << " (Out of bounds [0, 100])" << std::endl;
            status = "ALERT";
        } else {
            reading = value;
            status = "OK";
        }
    }
};

int main() {
    SensorData s("TEMP-S01", 45.2);
    std::cout << "Sensor " << s.getSensorId() << " Reading: " << s.getReading() << " | Status: " << s.getStatus() << std::endl;

    s.setReading(88.7);
    std::cout << "Sensor Reading: " << s.getReading() << " | Status: " << s.getStatus() << std::endl;

    s.setReading(105.4); // Out of bounds
    std::cout << "Sensor Status after invalid update: " << s.getStatus() << std::endl;
    return 0;
}
`,
      java: `// A03: Classes, Objects, and Encapsulation - Java
public class Main {
    public static class SensorData {
        private String sensorId;
        private double reading;
        private String status;

        public SensorData(String sensorId, double initialReading) {
            this.sensorId = sensorId;
            this.status = "OK";
            setReading(initialReading);
        }

        public String getSensorId() { return sensorId; }
        public double getReading() { return reading; }
        public String getStatus() { return status; }

        public void setReading(double value) {
            if (value < 0.0 || value > 100.0) {
                System.out.println("[ERROR] Invalid reading: " + value + " (Out of bounds [0, 100])");
                this.status = "ALERT";
            } else {
                this.reading = value;
                this.status = "OK";
            }
        }
    }

    public static void main(String[] args) {
        SensorData s = new SensorData("TEMP-S01", 45.2);
        System.out.println("Sensor " + s.getSensorId() + " Reading: " + s.getReading() + " | Status: " + s.getStatus());

        s.setReading(88.7);
        System.out.println("Sensor Reading: " + s.getReading() + " | Status: " + s.getStatus());

        s.setReading(105.4); // Out of bounds
        System.out.println("Sensor Status after invalid update: " + s.getStatus());
    }
}
`,
      python: `# A03: Classes, Objects, and Encapsulation - Python

class SensorData:
    def __init__(self, sensor_id: str, initial_reading: float):
        self._sensor_id = sensor_id
        self._status = "OK"
        self._reading = 0.0
        self.reading = initial_reading

    @property
    def sensor_id(self) -> str:
        return self._sensor_id

    @property
    def status(self) -> str:
        return self._status

    @property
    def reading(self) -> float:
        return self._reading

    @reading.setter
    def reading(self, value: float):
        if value < 0.0 or value > 100.0:
            print(f"[ERROR] Invalid reading: {value} (Out of bounds [0, 100])")
            self._status = "ALERT"
        else:
            self._reading = value
            self._status = "OK"

if __name__ == "__main__":
    s = SensorData("TEMP-S01", 45.2)
    print(f"Sensor {s.sensor_id} Reading: {s.reading} | Status: {s.status}")

    s.reading = 88.7
    print(f"Sensor Reading: {s.reading} | Status: {s.status}")

    s.reading = 105.4 # Out of bounds
    print(f"Sensor Status after invalid update: {s.status}")
`
    }
  },
  {
    code: 'A04',
    title: 'Inheritance and Polymorphism',
    subtitle: 'Implement abstract/base classes, dynamic dispatch, and polymorphic method overrides.',
    learningObjectives: [
      'Define base classes with virtual/abstract methods.',
      'Derive subclasses overriding behavior.',
      'Process polymorphic collections of objects in a single loop.'
    ],
    instructions: [
      'Create an abstract base class `Robot` (or interface) with method `performTask()`.',
      'Derive two subclasses: `CleanerRobot` and `ArmRobot`.',
      'Implement `performTask()` differently for each robot.',
      'Create an array/list of `Robot` pointers/references containing both types and iterate through them polymorphically.'
    ],
    submissionChecklist: [
      'Base Robot class with virtual/abstract performTask method.',
      'CleanerRobot and ArmRobot subclasses override performTask.',
      'Polymorphic collection stores instances of both subclasses.',
      'Loop calls performTask on each element producing distinct outputs.'
    ],
    starterCode: {
      cpp: `// A04: Inheritance and Polymorphism - C++
#include <iostream>
#include <vector>
#include <memory>

class Robot {
protected:
    std::string robotId;
public:
    Robot(std::string id) : robotId(id) {}
    virtual ~Robot() {}
    virtual void performTask() const = 0; // Pure virtual method
};

class CleanerRobot : public Robot {
public:
    CleanerRobot(std::string id) : Robot(id) {}
    void performTask() const override {
        std::cout << "[CleanerRobot " << robotId << "] Vacuuming floor grid & charging dock." << std::endl;
    }
};

class ArmRobot : public Robot {
public:
    ArmRobot(std::string id) : Robot(id) {}
    void performTask() const override {
        std::cout << "[ArmRobot " << robotId << "] Assembling component #402 with high precision." << std::endl;
    }
};

int main() {
    std::vector<std::unique_ptr<Robot>> fleet;
    fleet.push_back(std::make_unique<CleanerRobot>("VAC-01"));
    fleet.push_back(std::make_unique<ArmRobot>("ARM-99"));

    std::cout << "--- Executing Fleet Tasks ---" << std::endl;
    for (const auto& robot : fleet) {
        robot->performTask();
    }
    return 0;
}
`,
      java: `// A04: Inheritance and Polymorphism - Java
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static abstract class Robot {
        protected String robotId;

        public Robot(String id) {
            this.robotId = id;
        }

        public abstract void performTask();
    }

    public static class CleanerRobot extends Robot {
        public CleanerRobot(String id) {
            super(id);
        }

        @Override
        public void performTask() {
            System.out.println("[CleanerRobot " + robotId + "] Vacuuming floor grid & charging dock.");
        }
    }

    public static class ArmRobot extends Robot {
        public ArmRobot(String id) {
            super(id);
        }

        @Override
        public void performTask() {
            System.out.println("[ArmRobot " + robotId + "] Assembling component #402 with high precision.");
        }
    }

    public static void main(String[] args) {
        List<Robot> fleet = new ArrayList<>();
        fleet.add(new CleanerRobot("VAC-01"));
        fleet.add(new ArmRobot("ARM-99"));

        System.out.println("--- Executing Fleet Tasks ---");
        for (Robot robot : fleet) {
            robot.performTask();
        }
    }
}
`,
      python: `# A04: Inheritance and Polymorphism - Python
from abc import ABC, abstractmethod

class Robot(ABC):
    def __init__(self, robot_id: str):
        self.robot_id = robot_id

    @abstractmethod
    def perform_task(self):
        pass

class CleanerRobot(Robot):
    def perform_task(self):
        print(f"[CleanerRobot {self.robot_id}] Vacuuming floor grid & charging dock.")

class ArmRobot(Robot):
    def perform_task(self):
        print(f"[ArmRobot {self.robot_id}] Assembling component #402 with high precision.")

if __name__ == "__main__":
    fleet: list[Robot] = [
        CleanerRobot("VAC-01"),
        ArmRobot("ARM-99")
    ]

    print("--- Executing Fleet Tasks ---")
    for robot in fleet:
        robot.perform_task()
`
    }
  }
];
