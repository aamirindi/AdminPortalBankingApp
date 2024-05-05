package net.asifa.banking.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import net.asifa.banking.entity.Account;

public interface AccountRepository extends JpaRepository<Account, Long>{

	
}
