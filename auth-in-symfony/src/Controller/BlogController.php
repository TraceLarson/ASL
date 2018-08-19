<?php

namespace App\Controller;

use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use phpDocumentor\Reflection\Types\Self_;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class BlogController extends AbstractController
{
	
	const POST_LIMIT = 5;
	
	private $entityManager;
	private $authorRepository;
	private $blogPostRepository;
	
	public function __construct(EntityManagerInterface $entityManager) {
		
		$this->entityManager = $entityManager;
		$this->blogPostRepository = $entityManager->getRepository('App:BlogPost');
		$this->authorRepository = $entityManager->getRepository('App:Author');
	}
	
	/**
     * @Route("/", name="homepage")
	 * @Route("/entries", name="entries")
     */
    public function entriesAction(Request $request) {
	    $page = 1;
	
	    if ($request->get('page')) {
		    $page = $request->get('page');
	    }
	    
        return $this->render('blog/entries.html.twig', [
	        'blogPosts' => $this->blogPostRepository->getAllPosts($page, self::POST_LIMIT),
	        'totalBlogPosts' => $this->blogPostRepository->getPostCount(),
	        'page' => $page,
	        'entryLimit' => self::POST_LIMIT
        ]);
    }
    
    /**
     * @Route("/entry/{slug}", name="entry")
     */
	public function entryAction($slug) {
		$blogPost = $this->blogPostRepository->findOneBySlug($slug);
		
		if (!$blogPost) {
			$this->addFlash('error', 'Cannot find entry');
			
			return $this->redirectToRoute('entries');
		}
		
		return $this->render('blog/entry.html.twig', array(
			'blogPost' => $blogPost
		));
	}
	
	/**
	 * @Route("/author/{name}", name="author")
	 */
	public function authorAction($name)
	{
		$author = $this->authorRepository->findOneByUsername($name);
		
		if (!$author) {
			$this->addFlash('error', 'Unable to find author!');
			return $this->redirectToRoute('entries');
		}
		
		return $this->render('blog/author.html.twig', [
			'author' => $author
		]);
	}
    
    
    
}
