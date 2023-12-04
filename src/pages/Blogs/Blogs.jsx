import { Helmet } from "react-helmet-async";

const Blogs = () => {
    return (
        <div>
            <Helmet>
                <title>Applicruit | Medical Blogs</title>
            </Helmet>
            <h1 className="text-center my-4">Understanding Cardiovascular Health</h1>
            <div className="border max-w-3xl text-center mx-auto">
                <p>Cardiovascular health is crucial for overall well-being. Learn about common heart conditions, including hypertension, arrhythmia, and heart failure. Explore preventative measures and treatment options.</p>
                <p>Discover the role of diet, exercise, and lifestyle changes in maintaining a healthy heart.</p>
                <p>Stay updated with the latest research and advancements in cardiovascular medicine.</p>
            </div>

            <h1 className="text-center my-4">Mental Health Awareness</h1>
            <div className="border max-w-3xl text-center mx-auto">
                <p>Understanding mental health is essential for a balanced life. Explore articles on anxiety, depression, PTSD, and other mental health conditions. Learn about coping strategies, therapy options, and breaking the stigma.</p>
                <p>Discover mindfulness techniques, meditation practices, and resources for supporting mental health.</p>
                <p>Read inspiring stories and insights into the importance of seeking professional help and fostering a supportive environment for mental health.</p>
            </div>

            <h1 className="text-center my-4">Advancements in Oncology</h1>
            <div className="border max-w-3xl text-center mx-auto">
                <p>Stay informed about the latest breakthroughs in cancer research and treatments. Explore articles covering various types of cancers, risk factors, early detection methods, and innovative therapies in oncology.</p>
                <p>Understand the impact of genetics, lifestyle, and environmental factors on cancer development.</p>
                <p>Discover survivor stories, community support networks, and initiatives dedicated to cancer awareness and prevention.</p>
            </div>

            <h1 className="text-center my-4">Nutrition and Wellness</h1>
            <div className="border max-w-3xl text-center mx-auto mb-8">
                <p>Explore the role of nutrition in promoting overall wellness. Learn about balanced diets, superfoods, and meal plans for optimal health.</p>
                <p>Discover the connections between food, fitness, and mental well-being. Dive into articles on mindful eating, holistic approaches to wellness, and the importance of a well-rounded lifestyle.</p>
                <p>Stay updated with the latest trends in nutrition, fitness routines, and expert advice for maintaining a healthy life.</p>
            </div>
        </div>
    );
};

export default Blogs;
