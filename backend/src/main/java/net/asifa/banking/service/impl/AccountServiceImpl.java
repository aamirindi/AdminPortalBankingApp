package net.asifa.banking.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.asifa.banking.dto.AccountDto;
import net.asifa.banking.entity.Account;
import net.asifa.banking.mapper.AccountMapper;
import net.asifa.banking.repository.AccountRepository;
import net.asifa.banking.service.AccountService;

@Service
public class AccountServiceImpl implements AccountService{

	private AccountRepository accountRepository;
	
	@Autowired
	public AccountServiceImpl(AccountRepository accountRepository) {
		super();
		this.accountRepository = accountRepository;
	}

	@Override
	public AccountDto createAccount(AccountDto accountDto) {
		Account account = AccountMapper.mapToAccount(accountDto);
		Account  savedAccount = accountRepository.save(account);
		return AccountMapper.mapToAccountDto(savedAccount);
	}

	@Override
	public AccountDto getAccountById(Long id) {
		Account account = accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Account does not exist"));
		return AccountMapper.mapToAccountDto(account);
	}

	@Override
	public AccountDto deposit(Long id, double amount) {
		Account account = accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Account does not exist"));
		double total = account.getBalance() + amount;
		account.setBalance(total);
		Account  savedAccount = accountRepository.save(account);
		return AccountMapper.mapToAccountDto(savedAccount);
	}

	@Override
	public AccountDto withdraw(Long id, double amount) {
		Account account = accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Account does not exist"));
		if(account.getBalance() < amount) {
			throw new RuntimeException("Insufficient Balance");
		}
		double total = account.getBalance() - amount;
		account.setBalance(total);
		Account  savedAccount = accountRepository.save(account);
		return AccountMapper.mapToAccountDto(savedAccount);
	}

	@Override
	public List<AccountDto> getAllAccounts() {
		List<Account> accounts = accountRepository.findAll();
		return accounts.stream().map((account) -> AccountMapper.mapToAccountDto(account)).collect(Collectors.toList());
	}

	@Override
	public void deleteAccount(Long id) {
		Account account = accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Account does not exist"));
		accountRepository.deleteById(id);
	}

}
