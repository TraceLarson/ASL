<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use App\Entity\Contact;

use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;

class DefaultController extends Controller
{
    /**
     * @Route("/default", name="default")
     */
    public function index()
    {
        return $this->render('default/index.html.twig', [
            'controller_name' => 'DefaultController',
	        'users' => ['Rachel', 'Joe', 'Brad', 'Sarah', 'Jake', 'Rebbecca'],
	        'loggedin' => false,
        ]);
    }
    
    /**
     * @Route("/Contact")
     */
    public function contactAction(Request $request){
    	
    	$contact = new Contact();
    	
    	$form = $this->createFormBuilder($contact)
		    ->add('name', TextType::class)
		    ->add('email', EmailType::class)
		    ->add('msg', TextareaType::class)
		    ->add('save', SubmitType::class, array('label' => 'Contact Me'))
		    ->getForm();
    	
    	$form->handleRequest($request);
    	if ($form->isSubmitted() and $form->isValid()){
		    $this->redirectToRoute('thank-you');
	    }
    	
	    return $this->render('default/contact.html.twig', ['contact_form' => $form->createView()]);
    }
    
    /**
     * @Route("/thank-you", name="thank-you")
     */
    public function thankYouAction(){
	    return $this->render('default/thank-you.html.twig');
    }
}
