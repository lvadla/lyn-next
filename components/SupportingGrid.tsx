import { ArticleCard } from "../components/ArticleCard";
import { Container, Grid, SimpleGrid } from "@mantine/core";

function SupportingGrid() {
  return (
    <Container my="md">
      <SimpleGrid
        cols={2}
        spacing="md"
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
      >
        <ArticleCard
          lineclamp={50}
          author={{ name: "Bill Wormeater" }}
          image="https://tibber.imgix.net/zq85bj8o2ot3/9LhmXJX602slihlGpSnp0/ef615ded60856df4b90a483e9562751f/undefined?w=1600&fl=progressive&auto=format,compress&cs=tinysrgb"
          imageAlt="a lady blow-drying her hair"
          rating="important"
          description="Our crypto development lifecycle enables corporate, senior action points. You need to intelligently strategize your dot-bombs to increase your standpoint velocity. So we can hit the ground running, we will be proactively transforming every enterprise in our space. So we can hit the ground running, we will be effectively facilitating every architecture in our space. Efficiencies will come from dynamically investing our capabilities. Our creator development lifecycle enables holistic, competitive verticals. Our Wholesale User Experience solution offers ballpark figures a suite of mission critical offerings. Change the way you do business - adopt cloud native organic growths. In the bandwidth space, industry is iteratively leveraging its self-driving alignments. In the intrapreneur space, industry is globally offshoring its actionable knowledge transfers. We thrive because of our best-of-breed imagineering and unparalleled cloud culture. Our NFT development lifecycle enables seamless, immersive siloes."
          title="Self-driving user experience will deliver cloud value"
        />
        <Grid gutter="md">
          <Grid.Col>
            <ArticleCard
              author={{ name: "Elsa Gardenowl" }}
              image="https://tibber.imgix.net/zq85bj8o2ot3/15OIWuqLiWP7s9THk1vor8/d91560e014a99b92425c593e1163cd7e/Tibber_-_Shot_13_-_final_hires.jpg?w=1600&fl=progressive&auto=format,compress&cs=tinysrgb"
              imageAlt="a child is standing in a room"
              rating="important"
              description="It's critical that we give 110% when dynamically revolutionizing brands. We thrive because of our mission critical ballpark figure and cloud native deliverable culture. Change the way you do business - adopt senior blockchains. Going forward, our proactive best practice will deliver value to growth hackers."
              title="Direct mailing strategy buzz social proof"
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <ArticleCard
              author={{ name: "Robert Gluesticker" }}
              image="https://tibber.imgix.net/zq85bj8o2ot3/5G8pB1kBkeez4YzNWRe6xR/313840941589a9e6474fefa9ac277359/mag_artikel_kostnad_elbil_laddning_hemma__1_.png?w=1600&fl=progressive&auto=format,compress&cs=tinysrgb"
              imageAlt="a close-up picture of a new tree"
              rating="boring"
              description="Key players will take ownership of their diversities by proactively connecting actionable action points. Effectively synergising intelligently mobile cryptoes is crucial to our unparalleled agile workflow. So we can hit the ground running, we will be conservatively engineering every standpoint in our space. We use our corporate alignments to virtually manage our product expectations."
              title="Hypotheses value proposition"
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <ArticleCard
              author={{ name: "Danny Intern" }}
              image="https://tibber.imgix.net/zq85bj8o2ot3/5rZqzrGesyoywFRpbrZK2w/48c1bc2bc031fedc709605374fd896c7/dr-tesla_meta-image.png?w=1600&fl=progressive&auto=format,compress&cs=tinysrgb"
              imageAlt="a cat stands atop a charging electric vehicle"
              rating="super"
              description="Is your stakeholder prepared for best-of-breed market focus growth? In the future, will you be able to globally facilitate agile workflows in your business? Our business transforms drivers to virtually and reliably right-size our value-added capability. Effectively touching base about incentivizing standard setters will make us leaders in the immersive vertical industry."
              title="Our solution offers architectures a suite of customer-focused offerings"
            />
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
}

export default SupportingGrid;
