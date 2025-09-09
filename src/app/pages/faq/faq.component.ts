import { Component, OnInit } from '@angular/core';

interface FAQItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  faqItems: FAQItem[] = [
    {
      question: 'Qu\'est-ce que la fibre optique ?',
      answer: 'La fibre optique est une technologie de transmission de données qui utilise des fils de verre ou de plastique pour transmettre des signaux lumineux à très haute vitesse.'
    },
    {
      question: 'Quels sont les avantages de la fibre optique ?',
      answer: 'La fibre optique offre des vitesses de transmission très élevées, une faible latence, une immunité aux interférences électromagnétiques et une capacité de transmission sur de longues distances.'
    },
    {
      question: 'Combien de temps prend une installation ?',
      answer: 'Le temps d\'installation varie selon la complexité du projet, mais généralement entre 1 et 3 jours pour une installation standard.'
    },
    {
      question: 'Quelle est la garantie sur vos installations ?',
      answer: 'Nous offrons une garantie de 5 ans sur tous nos travaux d\'installation de fibre optique.'
    },
    {
      question: 'Proposez-vous un support technique ?',
      answer: 'Oui, nous offrons un support technique 24h/24, 7j/7 pour tous nos clients.'
    }
  ];

  ngOnInit() {}
}
