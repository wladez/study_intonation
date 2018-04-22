package ru.spbstu.icc.kspt.study_intonation.configuration;

import com.jolbox.bonecp.BoneCPDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableAutoConfiguration
@PropertySource("classpath:/study_intonation.properties")
@EnableTransactionManagement
public class ApplicationConfiguration {
    private static final String CHARACTER_ENCODING_UTF8 = "characterEncoding=utf8";
    private static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
    private static final String USE_UNICODE_TRUE = "useUnicode=true";
    private static final String CHARACTER_RESULT_SETS_UTF8 = "characterResultSets=utf8";
    private static final String SERVER_TIMEZONE_EUROPE_MOSCOW = "serverTimezone=Europe/Moscow";
    private static final String USE_SSL_FALSE = "useSSL=false";


    @Value("${ru.spbstu.icc.kspt.study_intonation.database.host}")
    private String databaseHost;

    @Value("${ru.spbstu.icc.kspt.study_intonation.database.port}")
    private String databasePort;

    @Value("${ru.spbstu.icc.kspt.study_intonation.database.name}")
    private String databaseName;

    @Value("${ru.spbstu.icc.kspt.study_intonation.database.user}")
    private String username;

    @Value("${ru.spbstu.icc.kspt.study_intonation.database.pass}")
    private String password;

    @Value("${ru.spbstu.icc.kspt.study_intonation.pool.maxConnectionsPerPartition}")
    private Integer maxConnectionsPerPartition;

    @Value("${ru.spbstu.icc.kspt.study_intonation.pool.minConnectionsPerPartition}")
    private Integer minConnectionsPerPartition;

    @Value("${ru.spbstu.icc.kspt.study_intonation.pool.partitionCount}")
    private Integer partitionCount;

    @Value("${ru.spbstu.icc.kspt.study_intonation.pool.acquireIncrement}")
    private Integer acquireIncrement;

    @Value("${ru.spbstu.icc.kspt.study_intonation.pool.statementsCacheSize}")
    private Integer statementsCacheSize;

    @Bean(destroyMethod = "close")
    public BoneCPDataSource dataSource() {

        final BoneCPDataSource boneCPDataSource = new BoneCPDataSource();

        final String jdbcUrl = "jdbc:mysql://"
                + databaseHost + ':'
                + databasePort + '/'
                + databaseName + '?'
                + USE_UNICODE_TRUE + '&'
                + CHARACTER_ENCODING_UTF8 + '&'
                + CHARACTER_RESULT_SETS_UTF8 + '&'
                + SERVER_TIMEZONE_EUROPE_MOSCOW + '&'
                + USE_SSL_FALSE;

        boneCPDataSource.setJdbcUrl(jdbcUrl);
        boneCPDataSource.setDriverClass(JDBC_DRIVER);
        boneCPDataSource.setUsername(username);
        boneCPDataSource.setPassword(password);
        boneCPDataSource.setMaxConnectionsPerPartition(maxConnectionsPerPartition);
        boneCPDataSource.setMinConnectionsPerPartition(minConnectionsPerPartition);
        boneCPDataSource.setPartitionCount(partitionCount);
        boneCPDataSource.setAcquireIncrement(acquireIncrement);
        boneCPDataSource.setStatementsCacheSize(statementsCacheSize);

        return boneCPDataSource;
    }

    @Bean
    public PlatformTransactionManager transactionManager() {
        return new DataSourceTransactionManager(dataSource());
    }

}
