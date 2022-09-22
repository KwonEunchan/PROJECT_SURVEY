package com.example.demo.user;

import com.example.demo.database.Database;
import org.springframework.web.bind.annotation.GetMapping;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class UserDAO {
    static public boolean start(String name,String phone){
        Connection conn = Database.getDB();
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        try {
            pstmt = conn.prepareStatement("SELECT * FROM SURVEY_USER WHERE PHONE = ?");
            pstmt.setString(1,phone);
            rs = pstmt.executeQuery();
            
            if(rs.next()){
                return false;
            }
            else{
                pstmt = conn.prepareStatement("INSERT INTO SURVEY_USER VALUES(?,?)");
                pstmt.setString(1,name);
                pstmt.setString(2,phone);
                pstmt.executeUpdate();
                return true;
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        finally {
            try {
                rs.close();
                pstmt.close();
                conn.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
    }
    static public boolean vote(String name){
        Connection conn = Database.getDB();
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        try {
            pstmt = conn.prepareStatement("SELECT * FROM SURVEY_VOTE WHERE NAME = ?");
            pstmt.setString(1,name);
            rs = pstmt.executeQuery();

            if(rs.next()){
                int num = rs.getInt("GETS")+1;
                pstmt = conn.prepareStatement("UPDATE SURVEY_VOTE SET GETS = ? WHERE NAME = ?");
                pstmt.setString(1,num+"");
                pstmt.setString(2,name);
                pstmt.executeUpdate();
                return true;
            }
            else{
                return false;
            }

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        finally {
            try {
                rs.close();
                pstmt.close();
                conn.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
    }

    @GetMapping("/result")
    public static int[] result(){
        Connection conn = Database.getDB();
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        try {
            pstmt = conn.prepareStatement("SELECT GETS FROM SURVEY_VOTE");
            rs = pstmt.executeQuery();
            int[] results = new int[4];
            int ptr = 0;

            while(rs.next()){
                results[ptr++] = rs.getInt("GETS");
            }

            return results;

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        finally {
            try {
                rs.close();
                pstmt.close();
                conn.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
    }

}
