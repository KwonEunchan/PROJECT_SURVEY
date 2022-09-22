package com.example.demo.database;

import java.sql.Connection;
import java.sql.DriverManager;


public class Database {
    static public Connection getDB(){
        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            String url = "jdbc:oracle:thin:@localhost:1521:XE";
            return DriverManager.getConnection(url,"hr","hr");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
