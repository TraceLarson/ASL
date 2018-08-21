<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\TimeType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;



class ListController extends Controller
{
    /**
     * @Route("/list", name="list")
     */
    public function index()
    {
        return $this->render('list/index.html.twig', [
            'controller_name' => 'ListController',
        ]);
    }
	
	
	/**
	 * @Route("/list/createItem")
	 */
	public function createAction(Request $request) {
		$form = $this->createFormBuilder()
			->add('title', TextType::class)
			->add('description', TextareaType::class)
			->add('date', DateType::class)
			->add('time', TimeType::class)
			->add('location', TextType::class)
			->add('repeat', ChoiceType::class, array('choices'=>array(
				'Never'=>'never',
				'Weekly'=>'weekly',
				'Monthly'=>'monthly'
			)))
			->add('submit', SubmitType::class)
			->getForm();
		
		$form->handleRequest($request);
		if($form->isSubmitted() )
		{
			return $this->redirectToRoute('list');
		}
		
		
		return $this->render('list/create.html.twig', ['item_form'=> $form->createView()]);
	}
 
}
