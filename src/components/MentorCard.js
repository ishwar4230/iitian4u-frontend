import React, { useEffect, useState } from 'react';
import { Card, Image, Text, Title, Flex, Divider, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mantine/hooks';

const MentorCard = ({ imageSrc, mentorName, college }) => {
    const navigate = useNavigate();
    const isMobile = useMediaQuery("(max-width: 768px)"); // Detect mobile screens
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
    const [timerExpired, setTimerExpired] = useState(false);

    // Initialize and persist the timer
    useEffect(() => {
        const timerKey = 'mentorOfferTimer';
        const now = Date.now();
        const storedTime = localStorage.getItem(timerKey);

        if (storedTime && now - storedTime < 10 * 60 * 1000) {
            setTimeLeft(600 - Math.floor((now - storedTime) / 1000));
        } else {
            localStorage.setItem(timerKey, now);
            setTimeLeft(600);
        }

        const interval = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime > 0) return prevTime - 1;
                clearInterval(interval);
                setTimerExpired(true);
                return 0;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Format time as MM:SS
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    return (
        <Card shadow="md" radius="md" withBorder p="lg" style={{ margin: 'auto', maxWidth: 800 }}>
            <Flex
                gap="md"
                direction={{ base: 'column', sm: 'row' }}
                align="center"
                style={{ width: '100%' }}
            >
                {/* Circular Image */}
                <Image
                    src={imageSrc}
                    alt={mentorName}
                    radius="50%"
                    width={120}
                    height={120}
                    style={{ objectFit: 'cover', flexShrink: 0, maxHeight: `${isMobile?'90px':''}`, maxWidth: `${isMobile?'90px':''}`}}
                // sx={(theme) => ({
                //     width: 60,
                //     height: 60,
                //     [theme.fn.largerThan('sm')]: {
                //         width: 120,
                //         height: 120,
                //     },
                // })}
                />

                {/* Text Section */}
                <div style={{ flex: 1, textAlign: 'center' }}>
                    <Title order={3} mb="sm">
                        Get End-to-End Counselling Guidance
                    </Title>

                    <Divider my="xs" />

                    <Text size="sm" mb="md">
                        Get end-to-end college counselling guidance with <span style={{ fontWeight: 'bold' }}>{mentorName}</span> from <span style={{ fontWeight: 'bold' }}>{college}</span>.
                    </Text>

                    <Button
                        variant="gradient"
                        gradient={{ from: 'teal', to: 'blue' }}
                        size="md"
                        onClick={() =>
                            navigate(
                                "/checkout?course_type=counselling&course_name=counselling&plan_type=life_time"
                            )
                        }
                        style={{ margin: '0 auto' }}
                    >
                        Grab the Offer <s style={{ margin: '0 5px', color: 'red' }}>₹799</s> ₹499
                        {!timerExpired && (
                            <span style={{ background: '#fff', color: '#2C3E50', padding: '0 6px', borderRadius: '4px', marginLeft: '10px' }}>
                                {formatTime(timeLeft)}
                            </span>
                        )}
                    </Button>
                </div>
            </Flex>
        </Card>
    );
};

export default MentorCard;
