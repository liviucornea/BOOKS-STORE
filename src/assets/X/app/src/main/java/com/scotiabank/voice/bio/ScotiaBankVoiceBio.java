package com.scotiabank.voice.bio;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.context.annotation.PropertySource;


/**
 * Created by LCornea on 4/28/2017.
 */

//@EnableAutoConfiguration(exclude=DataSourceAutoConfiguration.class)

@SpringBootApplication
@PropertySource("classpath:application.properties")
public class ScotiaBankVoiceBio {

    public static void main(String[] args) {
        SpringApplication.run(ScotiaBankVoiceBio.class, args);
    }

}
