package com.cp.raidmanager.cpraidmanagersystemcontrollerapp.service;

import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.aggregate.RaidAggregate;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.aggregate.UserAggregate;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

@Service
@RequiredArgsConstructor
public class MailerService {
    private static final String FROM = "raid-alerts@dodo.cp-sys.hu";
    private final Logger log = LoggerFactory.getLogger(MailerService.class);

    private final JavaMailSender mailer;
    private final SpringTemplateEngine springTemplateEngine;

    public void sendRaidPosted(String from, UserAggregate to, RaidAggregate raid) {
        log.info("to: {}", to);
        if (to.getEmail().equals("change me") || !to.getWantsEmails()) {
            return;
        }

        log.info("Sending [raid posted] notification to [{}]", to.getEmail());

        try {
            MimeMessage msg = mailer.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(msg, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());
            helper.setFrom(FROM, "Dodo Raid Alerts");
            helper.setSubject("A new raid was posted!");
            helper.setTo(to.getEmail());

            final Context ctx = new Context(Locale.UK);
            ctx.setVariable("logo", "dodologo.png");
            ctx.setVariable("poster", from);
            ctx.setVariable("raidName", raid.getName());
            ctx.setVariable("raidDateTime", OffsetDateTime.parse(raid.getRaidDateTime()).format(DateTimeFormatter.ofPattern("d MMMM HH:mm '(UTC)'")));
            ctx.setVariable("recipient", to.getId());
            ctx.setVariable("link", "https://dodo.cp-sys.hu/raids/upcoming?raid=" + raid.getId());

            String html = springTemplateEngine.process("raid-posted", ctx);
            helper.setText(html, true);

            helper.addInline("dodologo.png", new ClassPathResource("/templates/dodologo.png"));

            mailer.send(msg);
        } catch (Exception e) {
            log.error("Failed sending [raid posted] email: ", e);
        }
    }

    public void sendSignupConfirmed(String from, UserAggregate to, RaidAggregate raid) {
        if (to.getEmail().equals("change me") || !to.getWantsEmails()) {
            return;
        }

        log.info("Sending [confirmation] notification to [{}]", to.getEmail());

        try {
            MimeMessage msg = mailer.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(msg, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());
            helper.setFrom(FROM, "Dodo Raid Alerts");
            helper.setSubject("You were confirmed for a raid!");
            helper.setTo(to.getEmail());

            final Context ctx = new Context(Locale.UK);
            ctx.setVariable("logo", "dodologo.png");
            ctx.setVariable("poster", from);
            ctx.setVariable("raidName", raid.getName());
            ctx.setVariable("raidDateTime", OffsetDateTime.parse(raid.getRaidDateTime()).format(DateTimeFormatter.ofPattern("d MMMM HH:mm '(UTC)'")));
            ctx.setVariable("recipient", to.getId());
            ctx.setVariable("confirmedAs", raid.getConfirmedSignups().get(to.getId()).getJob().toString());
            ctx.setVariable("link", "https://dodo.cp-sys.hu/raids/upcoming?raid=" + raid.getId());

            String html = springTemplateEngine.process("confirmed-for-raid", ctx);
            helper.setText(html, true);

            helper.addInline("dodologo.png", new ClassPathResource("/templates/dodologo.png"));

            mailer.send(msg);
        } catch (Exception e) {
            log.error("Failed sending [raid posted] email: ", e);
        }
    }
}
