import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface FAQ {
    question: string;
    answer: string;
}

const faqs: FAQ[] = [
    {
        question: "What is the purpose of this platform?",
        answer: "Our platform is designed to help you learn efficiently by providing interactive Subjects, classroom collaboration, exams, and personal notebooks to support your education.",
    },
    {
        question: "How do I join a virtual classroom?",
        answer: "Simply navigate to the classroom section on your dashboard and click on the 'Join Class' button. You can access live sessions, recordings, and interact with instructors from there.",
    },
    {
        question: "Is there a way to review my previous exams?",
        answer: "Yes, all of your past exams are saved within your profile under the 'Examination' section. You can view your performance, analyze the results, and track your progress.",
    },
    {
        question: "Can I access my notes on different devices?",
        answer: "Absolutely! Your notes are saved securely in the cloud, which means you can access them from any device as long as you log into your account.",
    },
    {
        question: "How can I contact support if I have issues?",
        answer: "If you need help, you can contact our support team via the 'Help & Support' section on your dashboard. We are here to assist you with any inquiries or issues you may have.",
    },
];

const FAQSection: React.FC = () => {
    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom align="center">
                Frequently Asked Questions
            </Typography>
            {faqs.map((faq, index) => (
                <Box key={index} margin={2}> {/* Add margin to each accordion */}
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">{faq.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body2" color="text.secondary">
                                {faq.answer}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            ))}
        </Box>
    );
};

export default FAQSection;
