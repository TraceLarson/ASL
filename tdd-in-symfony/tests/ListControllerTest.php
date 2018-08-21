<?php
	
	namespace App\Tests;
	
	use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
	
	class ListControllerTest extends WebTestCase
	{
		public function testSomething()
		{
			$client = static::createClient();
			$crawler = $client->request('GET', '/list');
			
			$this->assertSame(200, $client->getResponse()->getStatusCode());
			$this->assertContains('Work', $crawler->filter('header h1')->text());
			$this->assertGreaterThan(0, $crawler->filter('#list a.item')->count());
			$this->assertContains('checked', $crawler->filter('#list a.item:first-child')->attr('class'));
			$this->assertEquals('/list/createItem', $crawler->filter('header a.create')->attr('href'));
			
			$link = $crawler->filter('header a.create')->link();
			$createPage = $client->click($link);
			$this->assertEquals('Create New', $createPage->filter('h1')->first()->text());
		}
		
		public function testCreate() {
			$client = static::createClient();
			$crawler = $client->request('GET', '/list/createItem');
			$this->assertTrue($client->getResponse()->isSuccessful());
			
			$form = $crawler->selectButton('Submit')->form();
			
			$form['form[title]'] = 'Title 1';
			$form['form[description]'] = 'Description';
			$form['form[date]'] = array('year'=>2017, 'month'=>1, 'day'=>1);
			$form['form[time]'] = array('hour'=>'11', 'minute'=>5);
			$form['form[location]'] = 'Starbucks';
			$form['form[repeat]']->select('never');
			
			$client->submit($form);
			$this->assertTrue($client->getResponse()->isRedirect('/'));
			
		}
	}